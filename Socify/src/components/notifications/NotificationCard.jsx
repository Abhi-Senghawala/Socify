import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  UserPlus,
  AtSign,
  Send,
  BookOpen,
  MoreHorizontal,
  Check,
  X,
  Clock,
} from "lucide-react";

const NotificationCard = ({ notification, onMarkRead, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (notification.type) {
      case "like":
        return <Heart size={16} className="text-pink-500" />;
      case "comment":
        return <MessageCircle size={16} className="text-blue-400" />;
      case "follow":
        return <UserPlus size={16} className="text-green-400" />;
      case "mention":
        return <AtSign size={16} className="text-purple-400" />;
      case "message":
        return <Send size={16} className="text-indigo-400" />;
      case "story_reply":
        return <BookOpen size={16} className="text-yellow-400" />;
      case "follow_request":
        return <UserPlus size={16} className="text-orange-400" />;
      default:
        return null;
    }
  };

  const getIconBackground = () => {
    switch (notification.type) {
      case "like":
        return "bg-pink-500/20";
      case "comment":
        return "bg-blue-500/20";
      case "follow":
        return "bg-green-500/20";
      case "mention":
        return "bg-purple-500/20";
      case "message":
        return "bg-indigo-500/20";
      case "story_reply":
        return "bg-yellow-500/20";
      case "follow_request":
        return "bg-orange-500/20";
      default:
        return "bg-gray-500/20";
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const handleClick = () => {
    if (!notification.read) {
      onMarkRead(notification.id);
    }
  };

  const handleMarkRead = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onMarkRead(notification.id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Delete this notification?")) {
      onDelete(notification.id);
    }
  };

  return (
    <Link
      to={notification.link}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`block relative group transition-all duration-300 ${
        !notification.read ? "bg-purple-500/5" : ""
      }`}
    >
      <div className="flex items-start gap-4 p-4 hover:bg-white/5 transition-colors">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full ${getIconBackground()} flex items-center justify-center`}
        >
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={notification.user.avatar}
                  alt={notification.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold text-white">
                  {notification.user.name}
                </span>{" "}
                <span className="text-gray-300">{notification.content}</span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={12} className="text-gray-500" />
                <span className="text-xs text-gray-500">
                  {formatTime(notification.timestamp)}
                </span>
                {!notification.read && (
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                )}
              </div>
            </div>
          </div>
        </div>

        {notification.postImage && (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
            <img
              src={notification.postImage}
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className={`flex items-center gap-1 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {!notification.read && (
            <button
              onClick={handleMarkRead}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              title="Mark as read"
            >
              <Check size={14} className="text-green-400" />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            title="Delete"
          >
            <X size={14} className="text-gray-400 hover:text-red-400" />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <MoreHorizontal size={14} className="text-gray-400" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
