// socket/socket.js
import { io } from "socket.io-client";

// Use import.meta.env instead of process.env for Vite
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ["websocket", "polling"],
  withCredentials: true,
});

// Socket event constants
export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  ERROR: "error",

  // Chat events
  JOIN_CHAT: "join:chat",
  LEAVE_CHAT: "leave:chat",
  SEND_MESSAGE: "send:message",
  RECEIVE_MESSAGE: "receive:message",
  MESSAGE_DELIVERED: "message:delivered",
  MESSAGE_READ: "message:read",
  MESSAGE_DELETED: "message:deleted",

  // Typing events
  TYPING_START: "typing:start",
  TYPING_STOP: "typing:stop",

  // User events
  USER_ONLINE: "user:online",
  USER_OFFLINE: "user:offline",
  USER_TYPING: "user:typing",

  // Group events
  GROUP_CREATED: "group:created",
  GROUP_UPDATED: "group:updated",
  GROUP_LEFT: "group:left",

  // Voice/Video events
  VOICE_CALL: "voice:call",
  VIDEO_CALL: "video:call",
  CALL_ACCEPTED: "call:accepted",
  CALL_REJECTED: "call:rejected",
  CALL_ENDED: "call:ended",

  // Notification events
  NOTIFICATION_NEW: "notification:new",
  NOTIFICATION_READ: "notification:read",
  NOTIFICATION_READ_ALL: "notification:read:all",
  NOTIFICATION_DELETED: "notification:delete",
};

// Initialize socket with auth token
export const initializeSocket = (token) => {
  socket.auth = { token };
  socket.connect();
};

// Disconnect socket
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;
