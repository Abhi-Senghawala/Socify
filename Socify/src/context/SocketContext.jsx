import React, { createContext, useContext, useEffect, useState } from "react";
import socket, {
  SOCKET_EVENTS,
  initializeSocket,
  disconnectSocket,
} from "../Socket/socket"
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    // Return a dummy socket object instead of throwing error
    console.warn("useSocket: SocketProvider not found, returning dummy socket");
    return {
      socket: null,
      isConnected: false,
      onlineUsers: new Set(),
      typingUsers: new Map(),
      socketError: null,
      joinChat: () => {},
      leaveChat: () => {},
      sendMessage: () => {},
      sendTypingStatus: () => {},
      markAsRead: () => {},
      deleteMessage: () => {},
    };
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const { user, token, loading: authLoading } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState(new Map());
  const [socketError, setSocketError] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (user && token) {
      initializeSocket(token);

      socket.on(SOCKET_EVENTS.CONNECT, handleConnect);
      socket.on(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
      socket.on(SOCKET_EVENTS.ERROR, handleError);
      socket.on(SOCKET_EVENTS.USER_ONLINE, handleUserOnline);
      socket.on(SOCKET_EVENTS.USER_OFFLINE, handleUserOffline);
      socket.on(SOCKET_EVENTS.USER_TYPING, handleUserTyping);

      return () => {
        socket.off(SOCKET_EVENTS.CONNECT, handleConnect);
        socket.off(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
        socket.off(SOCKET_EVENTS.ERROR, handleError);
        socket.off(SOCKET_EVENTS.USER_ONLINE, handleUserOnline);
        socket.off(SOCKET_EVENTS.USER_OFFLINE, handleUserOffline);
        socket.off(SOCKET_EVENTS.USER_TYPING, handleUserTyping);
        disconnectSocket();
      };
    }
  }, [user, token, authLoading]);

  const handleConnect = () => {
    console.log("Socket connected");
    setIsConnected(true);
    setSocketError(null);

    if (user) {
      socket.emit("user:online", { userId: user.id });
    }
  };

  const handleDisconnect = (reason) => {
    console.log("Socket disconnected:", reason);
    setIsConnected(false);
  };

  const handleError = (error) => {
    console.error("Socket error:", error);
    setSocketError(error.message);
  };

  const handleUserOnline = ({ userId }) => {
    setOnlineUsers((prev) => new Set([...prev, userId]));
  };

  const handleUserOffline = ({ userId }) => {
    setOnlineUsers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
  };

  const handleUserTyping = ({ chatId, userId, isTyping }) => {
    setTypingUsers((prev) => {
      const newMap = new Map(prev);
      if (isTyping) {
        newMap.set(chatId, userId);
      } else {
        newMap.delete(chatId);
      }
      return newMap;
    });
  };

  const joinChat = (chatId) => {
    if (socket && isConnected) {
      socket.emit(SOCKET_EVENTS.JOIN_CHAT, { chatId, userId: user?.id });
    }
  };

  const leaveChat = (chatId) => {
    if (socket && isConnected) {
      socket.emit(SOCKET_EVENTS.LEAVE_CHAT, { chatId, userId: user?.id });
    }
  };

  const sendMessage = (chatId, message, callback) => {
    if (socket && isConnected) {
      socket.emit(
        SOCKET_EVENTS.SEND_MESSAGE,
        {
          chatId,
          message,
          senderId: user?.id,
          timestamp: new Date().toISOString(),
        },
        callback,
      );
    }
  };

  const sendTypingStatus = (chatId, isTyping) => {
    if (socket && isConnected) {
      socket.emit(
        isTyping ? SOCKET_EVENTS.TYPING_START : SOCKET_EVENTS.TYPING_STOP,
        {
          chatId,
          userId: user?.id,
        },
      );
    }
  };

  const markAsRead = (chatId, messageId) => {
    if (socket && isConnected) {
      socket.emit(SOCKET_EVENTS.MESSAGE_READ, {
        chatId,
        messageId,
        userId: user?.id,
      });
    }
  };

  const deleteMessage = (chatId, messageId) => {
    if (socket && isConnected) {
      socket.emit(SOCKET_EVENTS.MESSAGE_DELETED, {
        chatId,
        messageId,
        userId: user?.id,
      });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        onlineUsers,
        typingUsers,
        socketError,
        joinChat,
        leaveChat,
        sendMessage,
        sendTypingStatus,
        markAsRead,
        deleteMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
