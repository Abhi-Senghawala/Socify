import React, { useState } from "react";
import {
  MoreHorizontal,
  Check,
  CheckCheck,
  X,
  Clock,
  Download,
  Play,
} from "lucide-react";
import { formatMessageTime } from "../../utils/dateUtils";

const MessageBubble = ({ message, isMe, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getStatusIcon = () => {
    switch (message.status) {
      case "sending":
        return <Clock size={12} className="text-gray-500 animate-pulse" />;
      case "sent":
        return <Check size={12} className="text-gray-400" />;
      case "delivered":
        return <CheckCheck size={12} className="text-gray-400" />;
      case "read":
        return <CheckCheck size={12} className="text-blue-400" />;
      case "failed":
        return <X size={12} className="text-red-400" />;
      default:
        return null;
    }
  };

  const handleImageClick = () => {
    window.open(message.image, "_blank");
  };

  const handleDelete = () => {
    if (window.confirm("Delete this message?")) {
      onDelete(message.id);
    }
  };

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} group`}>
      {!isMe && (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-2">
          <img
            src={message.senderAvatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className={`relative max-w-[70%] ${isMe ? "order-2" : "order-1"}`}>
        <div
          className={`absolute top-0 ${isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"} 
          opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 px-2`}
        >
          <button
            onClick={handleDelete}
            className="p-1 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X size={14} className="text-gray-400" />
          </button>
        </div>

        {message.type === "image" ? (
          <div className="relative rounded-2xl overflow-hidden max-w-xs cursor-pointer group/image">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={message.image}
              alt="Message attachment"
              className={`w-full h-auto transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onClick={handleImageClick}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
              <Download size={24} className="text-white" />
            </div>
          </div>
        ) : (
          <div
            className={`px-4 py-2 rounded-2xl break-words ${
              isMe
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-white/5 text-gray-300"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
        )}

        <div
          className={`flex items-center gap-1 mt-1 text-xs ${isMe ? "justify-end" : "justify-start"}`}
        >
          <span className="text-gray-500">
            {formatMessageTime(message.timestamp)}
          </span>
          {isMe && <span className="ml-1">{getStatusIcon()}</span>}
        </div>

        {message.reactions && message.reactions.length > 0 && (
          <div
            className={`absolute -bottom-2 ${isMe ? "left-0" : "right-0"} 
            flex gap-0.5 bg-gray-800 rounded-full px-1.5 py-0.5 border border-white/10`}
          >
            {message.reactions.map((reaction, index) => (
              <span
                key={index}
                className="text-xs cursor-pointer hover:scale-125 transition-transform"
              >
                {reaction}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;