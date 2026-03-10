import React from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { Loader } from "lucide-react";

const ChatWindow = ({
  selectedChat,
  messages,
  sending,
  loading,
  typingUsers,
  messagesEndRef,
  onSendMessage,
  onTyping,
  onLoadMore,
  hasMore,
  loadingMore,
  onReaction,
  onDeleteMessage,
  onToggleInfo,
}) => {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900/30">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">
            Your Messages
          </h3>
          <p className="text-gray-400 text-sm">
            Select a conversation to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-900/30">
      <ChatHeader
        chat={selectedChat}
        onToggleInfo={onToggleInfo}
        typingUsers={typingUsers}
      />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        {/* Load More */}
        {hasMore && (
          <div className="text-center mb-4">
            <button
              onClick={onLoadMore}
              disabled={loadingMore}
              className="text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              {loadingMore ? (
                <Loader size={16} className="animate-spin mx-auto" />
              ) : (
                "Load older messages"
              )}
            </button>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-3">
          {messages.map((message, index) => {
            const showDate =
              index === 0 ||
              new Date(message.timestamp).toDateString() !==
                new Date(messages[index - 1].timestamp).toDateString();

            return (
              <React.Fragment key={message.id}>
                {showDate && (
                  <div className="flex justify-center my-4">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">
                      {new Date(message.timestamp).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
                <MessageBubble
                  message={message}
                  isMe={message.senderId === "current_user"}
                  onReaction={onReaction}
                  onDelete={onDeleteMessage}
                />
              </React.Fragment>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Typing Indicator */}
        {typingUsers.size > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {selectedChat.user.name.charAt(0)}
              </span>
            </div>
            <div className="bg-white/5 rounded-2xl px-4 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={onSendMessage}
        onTyping={onTyping}
        sending={sending}
      />
    </div>
  );
};

export default ChatWindow;
