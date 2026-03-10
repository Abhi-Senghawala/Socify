import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";

export const useMessenger = () => {
  const { chatId } = useParams();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);

  // WebSocket connection for real-time
  useEffect(() => {
    // Simulate WebSocket connection
    wsRef.current = {
      send: (data) => console.log("WebSocket send:", data),
      close: () => console.log("WebSocket closed"),
    };

    // Simulate online users
    const onlineInterval = setInterval(() => {
      setOnlineUsers(new Set(["1", "2", "3"]));
    }, 5000);

    return () => {
      clearInterval(onlineInterval);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Fetch chats on mount
  useEffect(() => {
    fetchChats();
  }, []);

  // Fetch messages when chat changes
  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id, 1);
      setShowChatInfo(false);
    }
  }, [selectedChat]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChats = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setChats(mockChats);

      // Select first chat by default or from URL
      if (chatId) {
        const chat = mockChats.find((c) => c.id === chatId);
        if (chat) setSelectedChat(chat);
      } else if (mockChats.length > 0) {
        setSelectedChat(mockChats[0]);
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

  const generateMockMessages = (chatId, pageNum) => {
    const messages = [];
    const count = 20;
    const now = Date.now();

    for (let i = 0; i < count; i++) {
      const isMe = i % 3 === 0; // Every 3rd message is from me
      messages.push({
        id: `msg-${pageNum}-${i}`,
        chatId,
        senderId: isMe ? "current_user" : `user_${i}`,
        content: getRandomMessage(i),
        type: i % 10 === 0 ? "image" : "text",
        image:
          i % 10 === 0
            ? `https://images.unsplash.com/photo-${1600000000 + i}?w=400`
            : null,
        timestamp: new Date(now - (pageNum * 20 + i) * 60000).toISOString(),
        status: i < 5 ? "read" : i < 10 ? "delivered" : "sent",
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

  const sendMessage = async (content, type = "text", image = null) => {
    if (!selectedChat || (!content && !image)) return;

    setSending(true);

    // Optimistic update
    const tempMessage = {
      id: `temp-${Date.now()}`,
      chatId: selectedChat.id,
      senderId: "current_user",
      content,
      type,
      image,
      timestamp: new Date().toISOString(),
      status: "sending",
      reactions: [],
    };

    setMessages((prev) => [...prev, tempMessage]);
    scrollToBottom();

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update message status
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id ? { ...msg, status: "sent" } : msg,
        ),
      );

      // Simulate reply after 2 seconds (for demo)
      setTimeout(() => {
        if (selectedChat) {
          const replyMessage = {
            id: `reply-${Date.now()}`,
            chatId: selectedChat.id,
            senderId: selectedChat.user.id,
            content: getRandomMessage(Math.floor(Math.random() * 20)),
            type: "text",
            timestamp: new Date().toISOString(),
            status: "sent",
            reactions: [],
          };
          setMessages((prev) => [...prev, replyMessage]);

          // Update last message in chat list
          setChats((prev) =>
            prev.map((chat) =>
              chat.id === selectedChat.id
                ? {
                    ...chat,
                    lastMessage: replyMessage.content,
                    lastMessageTime: replyMessage.timestamp,
                  }
                : chat,
            ),
          );
        }
      }, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      // Mark as failed
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id ? { ...msg, status: "failed" } : msg,
        ),
      );
    } finally {
      setSending(false);
    }
  };

  const handleTyping = useCallback(
    (isTyping) => {
      if (!selectedChat) return;

      if (isTyping) {
        setTypingUsers((prev) => new Set([...prev, selectedChat.user.id]));
      } else {
        setTypingUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(selectedChat.user.id);
          return newSet;
        });
      }

      // Broadcast typing status via WebSocket
      if (wsRef.current) {
        wsRef.current.send({
          type: "typing",
          chatId: selectedChat.id,
          isTyping,
        });
      }
    },
    [selectedChat],
  );

  const loadMoreMessages = () => {
    if (selectedChat && hasMore && !loadingMore) {
      fetchMessages(selectedChat.id, page + 1);
    }
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleReaction = (messageId, reaction) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: msg.reactions.includes(reaction)
                ? msg.reactions.filter((r) => r !== reaction)
                : [...msg.reactions, reaction],
            }
          : msg,
      ),
    );
  };

  const handleDeleteMessage = (messageId) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };

  const startNewChat = async (user) => {
    try {
      // Check if chat already exists
      const existingChat = chats.find((chat) => chat.user.id === user.id);
      if (existingChat) {
        setSelectedChat(existingChat);
        setShowNewChatModal(false);
        return;
      }

      // Create new chat
      const newChat = {
        id: `chat-${Date.now()}`,
        user,
        lastMessage: "",
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
        isOnline: user.isOnline,
      };

      setChats((prev) => [newChat, ...prev]);
      setSelectedChat(newChat);
      setShowNewChatModal(false);
    } catch (error) {
      console.error("Error starting new chat:", error);
    }
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
    onlineUsers,
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
    handleReaction,
    handleDeleteMessage,
    startNewChat,
    scrollToBottom,
  };
};

// Mock Data
const mockChats = [
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
    isOnline: true,
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
    isOnline: false,
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
    isOnline: true,
  },
  {
    id: "4",
    user: {
      id: "104",
      name: "Emma Wilson",
      username: "emmaw",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      isOnline: false,
      lastSeen: new Date(Date.now() - 120 * 60000).toISOString(),
    },
    lastMessage: "See you tomorrow! 👋",
    lastMessageTime: new Date(Date.now() - 60 * 60000).toISOString(),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "5",
    user: {
      id: "105",
      name: "David Kim",
      username: "davidk",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      isOnline: true,
      lastSeen: new Date().toISOString(),
    },
    lastMessage: "That sounds great!",
    lastMessageTime: new Date(Date.now() - 180 * 60000).toISOString(),
    unreadCount: 1,
    isOnline: true,
  },
];
