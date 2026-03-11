import React from "react";
import { BellOff, Heart, MessageCircle, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyNotifications = ({ filter }) => {
  const getMessage = () => {
    switch (filter) {
      case "unread":
        return "You don't have any unread notifications";
      case "like":
        return "No likes yet. Posts you create will show likes here";
      case "comment":
        return "No comments yet. Engage with posts to get comments";
      case "follow":
        return "No new followers. Share your profile to grow your audience";
      case "mention":
        return "No mentions yet. When someone mentions you, they'll appear here";
      case "message":
        return "No messages yet. Start a conversation with someone";
      case "story_reply":
        return "No story replies yet. Post stories to get replies";
      default:
        return "You're all caught up! No notifications to show";
    }
  };

  const getIcon = () => {
    switch (filter) {
      case "like":
        return <Heart size={48} className="text-pink-400" />;
      case "comment":
        return <MessageCircle size={48} className="text-blue-400" />;
      case "follow":
        return <UserPlus size={48} className="text-green-400" />;
      default:
        return <BellOff size={48} className="text-gray-400" />;
    }
  };

  const getAction = () => {
    switch (filter) {
      case "like":
      case "comment":
        return (
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            Explore Posts
          </Link>
        );
      case "follow":
        return (
          <Link
            to="/search"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            Find People
          </Link>
        );
      default:
        return (
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            Go to Home
          </Link>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4">
        {getIcon()}
      </div>

      <h3 className="text-white font-semibold text-lg mb-2 text-center">
        {filter === "all" ? "No Notifications" : `No ${filter} Notifications`}
      </h3>

      <p className="text-gray-400 text-sm text-center max-w-sm mb-6">
        {getMessage()}
      </p>

      {getAction()}
    </div>
  );
};

export default EmptyNotifications;
