import React from "react";
import { Search, PlusCircle, MoreVertical } from "lucide-react";
import OnlineIndicator from "../common/OnlineIndicator";
import { formatMessageTime } from "../../utils/dateUtils";

const ChatList = ({
  chats,
  selectedChat,
  onSelectChat,
  searchQuery,
  onSearchChange,
  onNewChat,
}) => {
  return (
    <div className="w-full lg:w-80 border-r border-white/10 flex flex-col h-full bg-gray-900/50 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-lg">Messages</h2>
          <button
            onClick={onNewChat}
            className="p-2 hover:bg-white/5 rounded-xl transition-all group"
          >
            <PlusCircle
              size={20}
              className="text-gray-400 group-hover:text-purple-400"
            />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {chats.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">No conversations yet</p>
            <button
              onClick={onNewChat}
              className="mt-2 text-purple-400 text-sm hover:underline"
            >
              Start a new chat
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-white/5 transition-colors relative ${
                  selectedChat?.id === chat.id ? "bg-white/5" : ""
                }`}
              >
                {/* Avatar with Online Indicator */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={chat.user.avatar}
                      alt={chat.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <OnlineIndicator isOnline={chat.user.isOnline} />
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-semibold text-sm truncate">
                      {chat.user.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatMessageTime(chat.lastMessageTime)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 truncate text-left">
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Unread Badge */}
                {chat.unreadCount > 0 && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                      {chat.unreadCount}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
