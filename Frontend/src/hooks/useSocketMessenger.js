import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router";
import { useSocket } from "../context/SocketContext";
import { SOCKET_EVENTS } from "../Socket/socket";

export const useSocketMessenger = () => {
  const { chatId } = useParams();
  const {
    socket,
    isConnected,
    onlineUsers,
    typingUsers,
    joinChat,
    leaveChat,
    sendMessage: sendSocketMessage,
    sendTypingStatus,
    markAsRead,
    deleteMessage: deleteSocketMessage,
  } = useSocket();

  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [messageStatus, setMessageStatus] = useState(new Map());

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      joinChat(selectedChat.id);
      markMessagesAsRead(selectedChat.id);

      return () => {
        leaveChat(selectedChat.id);
      };
    }
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id, 1);
    }
  }, [selectedChat?.id]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      const { chatId: messageChatId, message } = data;

      if (selectedChat?.id === messageChatId) {
        setMessages((prev) => [...prev, message]);
        markAsRead(messageChatId, message.id);
        scrollToBottom();
      }

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === messageChatId
            ? {
                ...chat,
                lastMessage: message.content,
                lastMessageTime: message.timestamp,
                unreadCount:
                  selectedChat?.id === messageChatId
                    ? 0
                    : (chat.unreadCount || 0) + 1,
              }
            : chat,
        ),
      );
    };

    const handleMessageDelivered = (data) => {
      const { messageId, timestamp } = data;
      setMessageStatus((prev) =>
        new Map(prev).set(messageId, { status: "delivered", timestamp }),
      );

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: "delivered" } : msg,
        ),
      );
    };

    const handleMessageRead = (data) => {
      const { messageId, timestamp } = data;
      setMessageStatus((prev) =>
        new Map(prev).set(messageId, { status: "read", timestamp }),
      );

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: "read" } : msg,
        ),
      );
    };

    const handleMessageDeleted = (data) => {
      const { messageId } = data;
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    };

    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, handleReceiveMessage);
    socket.on(SOCKET_EVENTS.MESSAGE_DELIVERED, handleMessageDelivered);
    socket.on(SOCKET_EVENTS.MESSAGE_READ, handleMessageRead);
    socket.on(SOCKET_EVENTS.MESSAGE_DELETED, handleMessageDeleted);

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, handleReceiveMessage);
      socket.off(SOCKET_EVENTS.MESSAGE_DELIVERED, handleMessageDelivered);
      socket.off(SOCKET_EVENTS.MESSAGE_READ, handleMessageRead);
      socket.off(SOCKET_EVENTS.MESSAGE_DELETED, handleMessageDeleted);
    };
  }, [socket, selectedChat]);

  const fetchChats = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockChats = generateMockChats();

      const chatsWithOnline = mockChats.map((chat) => ({
        ...chat,
        user: {
          ...chat.user,
          isOnline: onlineUsers.has(chat.user.id),
        },
      }));

      setChats(chatsWithOnline);

      if (chatId) {
        const chat = chatsWithOnline.find((c) => c.id === chatId);
        if (chat) setSelectedChat(chat);
      } else if (chatsWithOnline.length > 0) {
        setSelectedChat(chatsWithOnline[0]);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (chatId, pageNum) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const mockMessages = generateMockMessages(chatId, pageNum);

      if (pageNum === 1) {
        setMessages(mockMessages);
      } else {
        setMessages((prev) => [...mockMessages, ...prev]);
      }

      setHasMore(mockMessages.length === 20);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const markMessagesAsRead = (chatId) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat,
      ),
    );

    messages.forEach((msg) => {
      if (msg.senderId !== "current_user" && msg.status !== "read") {
        markAsRead(chatId, msg.id);
      }
    });
  };

  const sendMessage = async (content, type = "text", image = null) => {
    if (!selectedChat || (!content && !image)) return;

    setSending(true);

    const tempId = `temp-${Date.now()}`;
    const newMessage = {
      id: tempId,
      chatId: selectedChat.id,
      senderId: "current_user",
      content,
      type,
      image,
      timestamp: new Date().toISOString(),
      status: "sending",
    };

    setMessages((prev) => [...prev, newMessage]);
    scrollToBottom();

    sendSocketMessage(selectedChat.id, newMessage, (ack) => {
      if (ack.error) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, status: "failed" } : msg,
          ),
        );
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId
              ? { ...msg, id: ack.messageId, status: "sent" }
              : msg,
          ),
        );
      }
    });

    setSending(false);
  };

  const handleTyping = useCallback(
    (isTyping) => {
      if (!selectedChat) return;

      sendTypingStatus(selectedChat.id, isTyping);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (isTyping) {
        typingTimeoutRef.current = setTimeout(() => {
          sendTypingStatus(selectedChat.id, false);
        }, 3000);
      }
    },
    [selectedChat],
  );

  const deleteMessage = (messageId) => {
    if (selectedChat) {
      deleteSocketMessage(selectedChat.id, messageId);
    }
  };

  const loadMoreMessages = () => {
    if (selectedChat && hasMore && !loadingMore) {
      fetchMessages(selectedChat.id, page + 1);
    }
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
    markMessagesAsRead(chat.id);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const filteredChats = searchQuery
    ? chats.filter(
        (chat) =>
          chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.user.username.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : chats;

  return {
    chats: filteredChats,
    messages,
    selectedChat,
    loading,
    sending,
    showChatInfo,
    showNewChatModal,
    searchQuery,
    isConnected,
    typingUsers,
    hasMore,
    loadingMore,
    messagesEndRef,
    setSearchQuery,
    setShowChatInfo,
    setShowNewChatModal,
    selectChat,
    sendMessage,
    handleTyping,
    loadMoreMessages,
    deleteMessage,
    scrollToBottom,
  };
};

const generateMockChats = () => {
  return [
    {
      id: "1",
      user: {
        id: "101",
        name: "Alex Johnson",
        username: "alexj",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        isOnline: true,
        lastSeen: new Date().toISOString(),
      },
      lastMessage: "Hey! How are you?",
      lastMessageTime: new Date(Date.now() - 5 * 60000).toISOString(),
      unreadCount: 2,
    },
    {
      id: "2",
      user: {
        id: "102",
        name: "Sarah Chen",
        username: "sarahc",
        avatar:
          "https://images.unsplash.com/photo-1494790108777-296fd3c5c1b2?w=100",
        isOnline: false,
        lastSeen: new Date(Date.now() - 30 * 60000).toISOString(),
      },
      lastMessage: "Did you see the new design?",
      lastMessageTime: new Date(Date.now() - 15 * 60000).toISOString(),
      unreadCount: 0,
    },
    {
      id: "3",
      user: {
        id: "103",
        name: "Mike Rivera",
        username: "miker",
        avatar:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
        isOnline: true,
        lastSeen: new Date().toISOString(),
      },
      lastMessage: "Thanks for the help! 🙏",
      lastMessageTime: new Date(Date.now() - 45 * 60000).toISOString(),
      unreadCount: 0,
    },
  ];
};

const generateMockMessages = (chatId, pageNum) => {
  const messages = [];
  const count = 20;
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const isMe = i % 3 === 0;
    const statuses = ["sent", "delivered", "read"];
    const status = isMe
      ? statuses[Math.floor(Math.random() * statuses.length)]
      : "sent";

    messages.push({
      id: `msg-${pageNum}-${i}`,
      chatId,
      senderId: isMe ? "current_user" : `user_${i}`,
      senderAvatar: isMe
        ? null
        : `https://images.unsplash.com/photo-${1500000000 + i}?w=50`,
      content: getRandomMessage(i),
      type: i % 10 === 0 ? "image" : "text",
      image:
        i % 10 === 0
          ? `https://images.unsplash.com/photo-${1600000000 + i}?w=400`
          : null,
      timestamp: new Date(now - (pageNum * 20 + i) * 60000).toISOString(),
      status,
      reactions: i % 7 === 0 ? ["❤️", "😂"] : [],
    });
  }

  return messages.reverse();
};

const getRandomMessage = (index) => {
  const messages = [
    "Hey! How are you?",
    "Did you see the new post?",
    "That's amazing! 🔥",
    "Can we meet tomorrow?",
    "Check this out!",
    "Love it! ❤️",
    "When are you free?",
    "Great work!",
    "Thanks for sharing",
    "😂😂😂",
    "Perfect!",
    "I agree",
    "Let's do it!",
    "Awesome!",
    "See you soon!",
    "Good morning! 🌅",
    "Have a great day!",
    "Miss you!",
    "Thinking of you",
    "Can't wait!",
  ];
  return messages[index % messages.length];
};