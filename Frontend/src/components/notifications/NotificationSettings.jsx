import React from "react";
import { Bell, Mail, Smartphone, X } from "lucide-react";

const NotificationSettings = ({ settings, onUpdate, onClose }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Notification Settings</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/5 rounded-lg transition-colors"
        >
          <X size={18} className="text-gray-400" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Smartphone size={16} className="text-purple-400" />
            <h4 className="text-white text-sm font-medium">
              Push Notifications
            </h4>
          </div>

          <label className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Enable Push</span>
            <button
              onClick={() => onUpdate("pushEnabled", !settings.pushEnabled)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.pushEnabled ? "bg-purple-500" : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.pushEnabled ? "translate-x-5" : ""
                }`}
              />
            </button>
          </label>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Mail size={16} className="text-purple-400" />
            <h4 className="text-white text-sm font-medium">
              Email Notifications
            </h4>
          </div>

          <label className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Enable Email</span>
            <button
              onClick={() => onUpdate("emailEnabled", !settings.emailEnabled)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.emailEnabled ? "bg-purple-500" : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.emailEnabled ? "translate-x-5" : ""
                }`}
              />
            </button>
          </label>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Bell size={16} className="text-purple-400" />
            <h4 className="text-white text-sm font-medium">Notify me about</h4>
          </div>

          <div className="space-y-2">
            {[
              { key: "likesEnabled", label: "Likes" },
              { key: "commentsEnabled", label: "Comments" },
              { key: "followsEnabled", label: "Follows" },
              { key: "mentionsEnabled", label: "Mentions" },
              { key: "messagesEnabled", label: "Messages" },
              { key: "storyRepliesEnabled", label: "Story Replies" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-gray-300">{item.label}</span>
                <button
                  onClick={() => onUpdate(item.key, !settings[item.key])}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    settings[item.key] ? "bg-purple-500" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings[item.key] ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
