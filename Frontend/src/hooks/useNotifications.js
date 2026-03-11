import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../context/SocketContext";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [unreadCount, setUnreadCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    pushEnabled: true,
    emailEnabled: true,
    likesEnabled: true,
    commentsEnabled: true,
    followsEnabled: true,
    mentionsEnabled: true,
    messagesEnabled: true,
    storyRepliesEnabled: true,
  });

  // Safely use socket with try-catch or check if context exists
  let socket = null;
  let isConnected = false;

  try {
    const socketContext = useSocket();
    socket = socketContext.socket;
    isConnected = socketContext.isConnected;
  } catch (error) {
    console.warn("Socket not available, running in offline mode");
  }

  // Fetch initial notifications
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Socket event listeners for real-time notifications
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (data) => {
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);

      if (settings.pushEnabled && Notification.permission === "granted") {
        new Notification(data.title, {
          body: data.message,
          icon: data.senderAvatar || "/logo.png",
          tag: data.id,
        });
      }
    };

    const handleNotificationRead = (data) => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === data.notificationId ? { ...notif, read: true } : notif,
        ),
      );
    };

    socket.on("notification:new", handleNewNotification);
    socket.on("notification:read", handleNotificationRead);

    return () => {
      socket.off("notification:new", handleNewNotification);
      socket.off("notification:read", handleNotificationRead);
    };
  }, [socket, settings]);

  // Request notification permission on mount
  useEffect(() => {
    if (settings.pushEnabled && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, [settings.pushEnabled]);

  const fetchNotifications = async (pageNum = 1) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockNotifications = generateMockNotifications(pageNum);

      if (pageNum === 1) {
        setNotifications(mockNotifications);
      } else {
        setNotifications((prev) => [...prev, ...mockNotifications]);
      }

      const unread = mockNotifications.filter((n) => !n.read).length;
      setUnreadCount((prev) => (pageNum === 1 ? unread : prev + unread));

      setHasMore(mockNotifications.length === 10);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const generateMockNotifications = (pageNum) => {
    const notifications = [];
    const types = [
      "like",
      "comment",
      "follow",
      "mention",
      "message",
      "story_reply",
      "follow_request",
    ];
    const users = [
      {
        name: "Alex Johnson",
        username: "alexj",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      },
      {
        name: "Sarah Chen",
        username: "sarahc",
        avatar:
          "https://images.unsplash.com/photo-1494790108777-296fd3c5c1b2?w=100",
      },
      {
        name: "Mike Rivera",
        username: "miker",
        avatar:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
      },
      {
        name: "Emma Wilson",
        username: "emmaw",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      },
      {
        name: "David Kim",
        username: "davidk",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      },
    ];

    for (let i = 0; i < 10; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      const id = (pageNum - 1) * 10 + i;
      const hoursAgo = Math.floor(Math.random() * 48);

      let content = "";
      let link = "#";

      switch (type) {
        case "like":
          content = `liked your post.`;
          link = "/post/123";
          break;
        case "comment":
          content = `commented: "Amazing shot! 🔥"`;
          link = "/post/123";
          break;
        case "follow":
          content = `started following you.`;
          link = "/profile/alexj";
          break;
        case "mention":
          content = `mentioned you in a comment.`;
          link = "/post/123";
          break;
        case "message":
          content = `sent you a message.`;
          link = "/messenger";
          break;
        case "story_reply":
          content = `replied to your story.`;
          link = "/stories";
          break;
        case "follow_request":
          content = `sent a follow request.`;
          link = "/profile/alexj";
          break;
      }

      notifications.push({
        id: `notif-${id}`,
        type,
        read: i > 2 ? false : true,
        user,
        content,
        timestamp: new Date(
          Date.now() - hoursAgo * 60 * 60 * 1000,
        ).toISOString(),
        link,
        postImage:
          type === "like" || type === "comment"
            ? "https://images.unsplash.com/photo-1507525425510-1f2d3996a1f1?w=100"
            : null,
      });
    }

    return notifications;
  };

  const loadMore = () => {
    if (hasMore && !loadingMore) {
      fetchNotifications(page + 1);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, read: true } : notif,
        ),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));

      await new Promise((resolve) => setTimeout(resolve, 300));

      if (socket) {
        socket.emit("notification:read", { notificationId });
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true })),
      );
      setUnreadCount(0);

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (socket) {
        socket.emit("notification:read:all");
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const notif = notifications.find((n) => n.id === notificationId);
      if (notif && !notif.read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));

      await new Promise((resolve) => setTimeout(resolve, 300));

      if (socket) {
        socket.emit("notification:delete", { notificationId });
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getFilteredNotifications = useCallback(() => {
    if (filter === "all") return notifications;
    if (filter === "unread") return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.type === filter);
  }, [notifications, filter]);

  const updateSettings = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));

    if (key === "pushEnabled" && value) {
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  };

 return {
   notifications: getFilteredNotifications(),
   allNotifications: notifications,
   loading,
   filter,
   unreadCount,
   hasMore,
   loadingMore,
   showSettings,
   settings,
   isConnected: isConnected || false,
   setFilter,
   setShowSettings,
   markAsRead,
   markAllAsRead, 
   deleteNotification,
   loadMore,
   updateSettings,
 };
};
