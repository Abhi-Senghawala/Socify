import React from "react";

const TypingIndicator = ({ user }) => {
  return (
    <div className="flex items-start gap-2">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white/5 rounded-2xl px-4 py-3">
        <div className="flex gap-1">
          <span
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></span>
        </div>
        <span className="text-xs text-gray-400 mt-1 block">
          {user.name} is typing...
        </span>
      </div>
    </div>
  );
};

export default TypingIndicator;
