import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export const useSettings = () => {
  const { theme, accentColor, setThemeMode, setAccent } = useTheme();
  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "johndoe",
    bio: "📸 Photography enthusiast | 🌍 Travel lover | ✨ Creating magic",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    gender: "male",
    website: "www.johndoe.com",
    location: "New York, USA",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
    coverImage:
      "https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?w=1200",
  });

  const [account, setAccount] = useState({
    private: false,
    twoFactorAuth: false,
    loginNotifications: true,
    activeSessions: [
      {
        id: 1,
        device: "Chrome on Windows",
        location: "New York, USA",
        lastActive: "Now",
        current: true,
      },
      {
        id: 2,
        device: "Safari on iPhone",
        location: "New York, USA",
        lastActive: "2 hours ago",
      },
      {
        id: 3,
        device: "Firefox on Mac",
        location: "Los Angeles, USA",
        lastActive: "3 days ago",
      },
    ],
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    activityStatus: true,
    showLikes: true,
    showFollowers: true,
    taggedPosts: "everyone",
    directMessages: "everyone",
    storyVisibility: "everyone",
    blockList: [
      { id: 1, username: "spam_user1", name: "Spam User 1" },
      { id: 2, username: "troll_account", name: "Troll Account" },
    ],
    restrictedList: [],
  });

  const [notifications, setNotifications] = useState({
    push: {
      likes: true,
      comments: true,
      follows: true,
      messages: true,
      mentions: true,
      storyReplies: true,
      newPosts: false,
    },
    email: {
      likes: false,
      comments: false,
      follows: true,
      messages: true,
      mentions: true,
      newsletter: false,
      tips: false,
    },
    sms: {
      security: true,
      promotions: false,
    },
  });

  const [security, setSecurity] = useState({
    passwordLastChanged: "2024-01-15",
    emailVerified: true,
    phoneVerified: true,
    loginHistory: [
      {
        id: 1,
        device: "Chrome on Windows",
        location: "New York, USA",
        ip: "192.168.1.1",
        time: "2 hours ago",
        status: "success",
      },
      {
        id: 2,
        device: "Safari on iPhone",
        location: "New York, USA",
        ip: "192.168.1.2",
        time: "2 days ago",
        status: "success",
      },
      {
        id: 3,
        device: "Unknown Device",
        location: "Russia",
        ip: "185.165.29.101",
        time: "1 week ago",
        status: "failed",
      },
    ],
    connectedApps: [
      {
        id: 1,
        name: "Google",
        icon: "google",
        connected: true,
        permissions: ["email", "profile"],
      },
      {
        id: 2,
        name: "Facebook",
        icon: "facebook",
        connected: true,
        permissions: ["email", "posts"],
      },
      { id: 3, name: "Twitter", icon: "twitter", connected: false },
    ],
  });

  useEffect(() => {
    loadSavedSettings();
  }, []);

  const loadSavedSettings = () => {
    try {
      const savedProfile = localStorage.getItem("profile");
      if (savedProfile) setProfile(JSON.parse(savedProfile));

      const savedAccount = localStorage.getItem("account");
      if (savedAccount) setAccount(JSON.parse(savedAccount));

      const savedPrivacy = localStorage.getItem("privacy");
      if (savedPrivacy) setPrivacy(JSON.parse(savedPrivacy));

      const savedNotifications = localStorage.getItem("notifications");
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));

      const savedSecurity = localStorage.getItem("security");
      if (savedSecurity) setSecurity(JSON.parse(savedSecurity));
    } catch (err) {
      console.error("Error loading settings:", err);
    }
  };

  const saveSettings = async (section, data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      switch (section) {
        case "profile":
          setProfile(data);
          localStorage.setItem("profile", JSON.stringify(data));
          break;
        case "account":
          setAccount(data);
          localStorage.setItem("account", JSON.stringify(data));
          break;
        case "privacy":
          setPrivacy(data);
          localStorage.setItem("privacy", JSON.stringify(data));
          break;
        case "notifications":
          setNotifications(data);
          localStorage.setItem("notifications", JSON.stringify(data));
          break;
        case "security":
          setSecurity(data);
          localStorage.setItem("security", JSON.stringify(data));
          break;
        default:
          break;
      }

      setSuccess("Settings saved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to save settings. Please try again.");
      console.error("Error saving settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updateAccount = (field, value) => {
    setAccount((prev) => ({ ...prev, [field]: value }));
  };

  const updatePrivacy = (field, value) => {
    setPrivacy((prev) => ({ ...prev, [field]: value }));
  };

  const updateNotification = (category, field, value) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const updateSecurity = (field, value) => {
    setSecurity((prev) => ({ ...prev, [field]: value }));
  };

  const removeBlockedUser = (userId) => {
    setPrivacy((prev) => ({
      ...prev,
      blockList: prev.blockList.filter((user) => user.id !== userId),
    }));
  };

  const logoutAllDevices = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess("Logged out from all other devices!");
    } catch (err) {
      setError("Failed to logout from all devices.");
    } finally {
      setLoading(false);
    }
  };

  const deactivateAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to deactivate your account? This action can be undone.",
      )
    ) {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSuccess("Account deactivated successfully!");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } catch (err) {
        setError("Failed to deactivate account.");
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    activeSection,
    setActiveSection,
    profile,
    account,
    privacy,
    notifications,
    security,
    loading,
    success,
    error,
    updateProfile,
    updateAccount,
    updatePrivacy,
    updateNotification,
    updateSecurity,
    saveSettings,
    removeBlockedUser,
    logoutAllDevices,
    deactivateAccount,
  };
};
