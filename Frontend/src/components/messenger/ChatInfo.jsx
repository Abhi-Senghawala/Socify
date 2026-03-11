import React from "react";
import { X, Bell, Search, Image, FileText, Trash2 } from "lucide-react";

const ChatInfo = ({ chat, onClose }) => {
  const sharedMedia = [
    {
      id: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1507525425510-1f2d3996a1f1?w=200",
    },
    {
      id: 2,
      type: "image",
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200",
    },
    {
      id: 3,
      type: "image",
      url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200",
    },
    {
      id: 4,
      type: "image",
      url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200",
    },
  ];

  return (
    <div className="w-80 border-l border-white/10 bg-gray-900/50 backdrop-blur-sm flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-white font-semibold">Chat Info</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <X size={18} className="text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* User Profile */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3">
            <img
              src={chat.user.avatar}
              alt={chat.user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="text-white font-semibold text-lg">{chat.user.name}</h4>
          <p className="text-gray-400 text-sm">@{chat.user.username}</p>
          <p className="text-xs text-gray-500 mt-1">
            {chat.user.isOnline
              ? "Active now"
              : `Last seen ${new Date(chat.user.lastSeen).toLocaleString()}`}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors">
            <Bell size={18} className="text-gray-400" />
            <span className="text-white text-sm">Mute Notifications</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors">
            <Search size={18} className="text-gray-400" />
            <span className="text-white text-sm">Search in Conversation</span>
          </button>
        </div>

        {/* Shared Media */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">
            Shared Media
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {sharedMedia.map((media) => (
              <div
                key={media.id}
                className="aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={media.url}
                  alt="Shared"
                  className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                />
              </div>
            ))}
          </div>
          <button className="w-full text-center text-sm text-purple-400 mt-3 hover:underline">
            View All
          </button>
        </div>

        {/* Danger Zone */}
        <div className="pt-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 p-3 hover:bg-red-500/10 rounded-xl transition-colors group">
            <Trash2
              size={18}
              className="text-red-400 group-hover:text-red-300"
            />
            <span className="text-red-400 text-sm group-hover:text-red-300">
              Delete Chat
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
