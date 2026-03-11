// pages/Messenger/components/ChatHeader.jsx
import React from "react";
import { ArrowLeft, Phone, Video, Info, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ chat, onToggleInfo, isTyping, isOnline }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gray-900/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-400" />
        </button>

        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={chat.user.avatar}
              alt={chat.user.name}
              className="w-full h-full object-cover"
            />
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
          )}
        </div>

        <div>
          <h3 className="text-white font-semibold">{chat.user.name}</h3>
          <p className="text-xs">
            {isTyping ? (
              <span className="text-purple-400 animate-pulse">Typing...</span>
            ) : isOnline ? (
              <span className="text-green-400">Active now</span>
            ) : (
              <span className="text-gray-400">
                Last seen{" "}
                {new Date(chat.user.lastSeen).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
          <Phone size={18} className="text-gray-400" />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
          <Video size={18} className="text-gray-400" />
        </button>
        <button
          onClick={onToggleInfo}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <Info size={18} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
