import React from "react";
import Layout from "../../components/layout/Layout";
import { useMessenger } from "../../hooks/useMessenger";
import ChatList from "../../components/messenger/ChatList";
import ChatWindow from "../../components/messenger/ChatWindow";
import ChatInfo from "../../components/messenger/ChatInfo";
import NewChatModal from "../../components/messenger/NewChatModal";

const Messenger = () => {
  const {
    chats,
    messages,
    selectedChat,
    loading,
    sending,
    showChatInfo,
    showNewChatModal,
    searchQuery,
    typingUsers,
    hasMore,
    loadingMore,
    messagesEndRef,
    setSearchQuery,
    setShowChatInfo,
    setShowNewChatModal,
    selectChat,
    sendMessage,
    handleTyping,
    loadMoreMessages,
    handleReaction,
    handleDeleteMessage,
    startNewChat,
  } = useMessenger();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-500 rounded-full animate-spin animate-delay-150"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-[calc(100vh-5rem)] flex rounded-2xl overflow-hidden border border-white/10 bg-gray-900/50 backdrop-blur-sm">
        {/* Chat List */}
        <ChatList
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={selectChat}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewChat={() => setShowNewChatModal(true)}
        />

        {/* Chat Window */}
        <ChatWindow
          selectedChat={selectedChat}
          messages={messages}
          sending={sending}
          loading={loading}
          typingUsers={typingUsers}
          messagesEndRef={messagesEndRef}
          onSendMessage={sendMessage}
          onTyping={handleTyping}
          onLoadMore={loadMoreMessages}
          hasMore={hasMore}
          loadingMore={loadingMore}
          onReaction={handleReaction}
          onDeleteMessage={handleDeleteMessage}
          onToggleInfo={() => setShowChatInfo(!showChatInfo)}
        />

        {/* Chat Info Sidebar */}
        {showChatInfo && selectedChat && (
          <ChatInfo
            chat={selectedChat}
            onClose={() => setShowChatInfo(false)}
          />
        )}
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <NewChatModal
          onClose={() => setShowNewChatModal(false)}
          onStartChat={startNewChat}
        />
      )}
    </Layout>
  );
};

export default Messenger;