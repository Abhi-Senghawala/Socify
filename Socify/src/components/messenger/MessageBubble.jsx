import React, { useState } from "react";
import {
  MoreHorizontal,
  Check,
  CheckCheck,
  X,
  Heart,
  Smile,
} from "lucide-react";
import { formatMessageTime } from "../../utils/dateUtils";

const MessageBubble = ({ message, isMe, onReaction, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const reactions = ["❤️", "😂", "😮", "😢", "🔥", "👍"];

  const getStatusIcon = () => {
    switch (message.status) {
      case "sending":
        return <Check size={14} className="text-gray-500" />;
      case "sent":
        return <Check size={14} className="text-gray-400" />;
      case "delivered":
        return <CheckCheck size={14} className="text-gray-400" />;
      case "read":
        return <CheckCheck size={14} className="text-purple-400" />;
      case "failed":
        return <X size={14} className="text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} group`}>
      <div className={`relative max-w-[70%] ${isMe ? "order-2" : "order-1"}`}>
        {/* Message Actions */}
        <div
          className={`absolute top-0 ${isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"} 
          opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 px-2`}
        >
          <button
            onClick={() => setShowReactions(!showReactions)}
            className="p-1 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Smile size={14} className="text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(message.id)}
            className="p-1 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X size={14} className="text-gray-400" />
          </button>
        </div>

        {/* Reactions Picker */}
        {showReactions && (
          <div
            className={`absolute ${isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"} 
            top-0 bg-gray-800 rounded-full p-1 flex gap-1 border border-white/10`}
          >
            {reactions.map((reaction) => (
              <button
                key={reaction}
                onClick={() => {
                  onReaction(message.id, reaction);
                  setShowReactions(false);
                }}
                className="w-6 h-6 hover:scale-125 transition-transform"
              >
                <span className="text-sm">{reaction}</span>
              </button>
            ))}
          </div>
        )}

        {/* Message Content */}
        {message.type === "image" ? (
          <div className="rounded-2xl overflow-hidden max-w-xs">
            <img
              src={message.image}
              alt="Message attachment"
              className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(message.image, "_blank")}
            />
          </div>
        ) : (
          <div
            className={`px-4 py-2 rounded-2xl break-words ${
              isMe
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-white/5 text-gray-300"
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
        )}

        {/* Message Footer */}
        <div
          className={`flex items-center gap-1 mt-1 text-xs ${isMe ? "justify-end" : "justify-start"}`}
        >
          <span className="text-gray-500">
            {formatMessageTime(message.timestamp)}
          </span>
          {isMe && getStatusIcon()}
        </div>

        {/* Reactions Display */}
        {message.reactions && message.reactions.length > 0 && (
          <div
            className={`absolute -bottom-2 ${isMe ? "left-0" : "right-0"} 
            flex gap-0.5 bg-gray-800 rounded-full px-1.5 py-0.5 border border-white/10`}
          >
            {message.reactions.map((reaction, index) => (
              <span key={index} className="text-xs">
                {reaction}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Avatar for other users */}
      {!isMe && (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-2 order-1">
          <img
            src={message.senderAvatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
