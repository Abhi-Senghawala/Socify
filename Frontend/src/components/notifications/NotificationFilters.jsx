import React from "react";
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  AtSign,
  Send,
  BookOpen,
  MailOpen,
} from "lucide-react";

const NotificationFilters = ({ filter, onFilterChange, unreadCount }) => {
  const filters = [
    { id: "all", icon: Bell, label: "All", count: null },
    { id: "unread", icon: MailOpen, label: "Unread", count: unreadCount },
    { id: "like", icon: Heart, label: "Likes" },
    { id: "comment", icon: MessageCircle, label: "Comments" },
    { id: "follow", icon: UserPlus, label: "Follows" },
    { id: "mention", icon: AtSign, label: "Mentions" },
    { id: "message", icon: Send, label: "Messages" },
    { id: "story_reply", icon: BookOpen, label: "Story Replies" },
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
      <h3 className="text-white font-semibold text-sm mb-3 px-2">Filters</h3>
      <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
        {filters.map((item) => {
          const Icon = item.icon;
          const isActive = filter === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} className={isActive ? "text-purple-400" : ""} />
              <span className="text-sm font-medium whitespace-nowrap lg:whitespace-normal">
                {item.label}
              </span>
              {item.count !== null && item.count > 0 && (
                <span className="ml-auto px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationFilters;
