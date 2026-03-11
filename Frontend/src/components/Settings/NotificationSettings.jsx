import React from "react";
import {
  Bell,
  Mail,
  Smartphone,
  Heart,
  MessageCircle,
  UserPlus,
  AtSign,
  Camera,
  Megaphone,
} from "lucide-react";
import SettingsCard from "./SettingsCard";

const NotificationSettings = ({
  notifications,
  onUpdate,
  onSave,
  loading,
  success,
  error,
}) => {
  const handleToggleChange = (category, field) => {
    onUpdate(category, field, !notifications[category][field]);
  };

  const NotificationSection = ({ title, icon: Icon, category, items }) => (
    <div className="pt-4 first:pt-0">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} className="text-purple-400" />
        <h3 className="text-white font-semibold">{title}</h3>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.field} className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">{item.label}</p>
              {item.description && (
                <p className="text-xs text-gray-400">{item.description}</p>
              )}
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[category][item.field]}
                onChange={() => handleToggleChange(category, item.field)}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors ${
                  notifications[category][item.field]
                    ? "bg-purple-500"
                    : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications[category][item.field] ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const pushItems = [
    {
      field: "likes",
      label: "Likes",
      description: "When someone likes your post",
    },
    {
      field: "comments",
      label: "Comments",
      description: "When someone comments on your post",
    },
    {
      field: "follows",
      label: "Follows",
      description: "When someone follows you",
    },
    {
      field: "messages",
      label: "Messages",
      description: "When you receive a direct message",
    },
    {
      field: "mentions",
      label: "Mentions",
      description: "When someone mentions you",
    },
    {
      field: "storyReplies",
      label: "Story Replies",
      description: "When someone replies to your story",
    },
    {
      field: "newPosts",
      label: "New Posts",
      description: "From people you follow",
    },
  ];

  const emailItems = [
    { field: "likes", label: "Likes" },
    { field: "comments", label: "Comments" },
    { field: "follows", label: "Follows" },
    { field: "messages", label: "Messages" },
    { field: "mentions", label: "Mentions" },
    {
      field: "newsletter",
      label: "Newsletter",
      description: "Weekly updates and tips",
    },
    {
      field: "tips",
      label: "Tips & Tricks",
      description: "Learn about new features",
    },
  ];

  const smsItems = [
    {
      field: "security",
      label: "Security Alerts",
      description: "Important account notifications",
    },
    {
      field: "promotions",
      label: "Promotions",
      description: "Offers and updates",
    },
  ];

  return (
    <SettingsCard
      title="Notification Settings"
      description="Choose what notifications you want to receive"
      onSave={onSave}
      loading={loading}
      success={success}
      error={error}
    >
      <div className="space-y-6">
        <NotificationSection
          title="Push Notifications"
          icon={Bell}
          category="push"
          items={pushItems}
        />

        <NotificationSection
          title="Email Notifications"
          icon={Mail}
          category="email"
          items={emailItems}
        />

        <NotificationSection
          title="SMS Notifications"
          icon={Smartphone}
          category="sms"
          items={smsItems}
        />

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white font-semibold mb-3">Quiet Hours</h3>
          <p className="text-sm text-gray-400 mb-4">
            Mute notifications during specific hours
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">From</label>
              <input
                type="time"
                defaultValue="22:00"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">To</label>
              <input
                type="time"
                defaultValue="08:00"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-white/30 bg-white/5 text-purple-500"
            />
            <span className="text-sm text-gray-300">Enable quiet hours</span>
          </label>
        </div>
      </div>
    </SettingsCard>
  );
};

export default NotificationSettings;
