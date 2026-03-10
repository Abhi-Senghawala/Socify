import React from "react";
import { ArrowLeft, Phone, Video, Info, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OnlineIndicator from "../common/OnlineIndicator";

const ChatHeader = ({ chat, onToggleInfo, typingUsers }) => {
  const navigate = useNavigate();
  const isTyping = typingUsers.has(chat.user.id);

  return (
    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gray-900/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {/* Back button for mobile */}
        <button
          onClick={() => navigate(-1)}
          className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-400" />
        </button>

        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={chat.user.avatar}
              alt={chat.user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <OnlineIndicator isOnline={chat.user.isOnline} />
        </div>

        {/* User Info */}
        <div>
          <h3 className="text-white font-semibold">{chat.user.name}</h3>
          <p className="text-xs text-gray-400">
            {isTyping ? (
              <span className="text-purple-400">Typing...</span>
            ) : chat.user.isOnline ? (
              "Active now"
            ) : (
              `Last seen ${new Date(chat.user.lastSeen).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            )}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/5 rounded-xl transition-colors lg:hidden">
          <Phone size={18} className="text-gray-400" />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-xl transition-colors lg:hidden">
          <Video size={18} className="text-gray-400" />
        </button>
        <button
          onClick={onToggleInfo}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <Info size={18} className="text-gray-400" />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
          <MoreVertical size={18} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
