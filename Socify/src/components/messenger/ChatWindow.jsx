import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { Loader, WifiOff } from "lucide-react";

const ChatWindow = ({
  selectedChat,
  messages,
  sending,
  loading,
  typingUsers,
  isConnected,
  messagesEndRef,
  onSendMessage,
  onTyping,
  onLoadMore,
  hasMore,
  loadingMore,
  onDeleteMessage,
  onToggleInfo,
}) => {
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

  const isTyping = typingUsers.has(selectedChat.id);

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-900/30">
      {!isConnected && (
        <div className="bg-red-500/10 border-b border-red-500/20 p-2 flex items-center justify-center gap-2">
          <WifiOff size={14} className="text-red-400" />
          <span className="text-xs text-red-400">
            Connection lost. Reconnecting...
          </span>
        </div>
      )}

      <ChatHeader
        chat={selectedChat}
        onToggleInfo={onToggleInfo}
        isTyping={isTyping}
        isOnline={selectedChat.user.isOnline}
      />

      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
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
                  onDelete={onDeleteMessage}
                />
              </React.Fragment>
            );
          })}

          {isTyping && <TypingIndicator user={selectedChat.user} />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput
        onSendMessage={onSendMessage}
        onTyping={onTyping}
        sending={sending}
        disabled={!isConnected}
      />
    </div>
  );
};

export default ChatWindow;
