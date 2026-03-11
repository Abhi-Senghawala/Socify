import React from "react";
import Layout from "../../components/layout/Layout";
import { SocketProvider } from "../../context/SocketContext";
import { useSocketMessenger } from "../../hooks/useSocketMessenger";
import ChatList from "../../components/messenger/ChatList";
import ChatWindow from "../../components/messenger/ChatWindow";
import ChatInfo from "../../components/messenger/ChatInfo";
import NewChatModal from "../../components/messenger/NewChatModal";

const MessengerContent = () => {
  const {
    chats,
    messages,
    selectedChat,
    loading,
    sending,
    showChatInfo,
    showNewChatModal,
    searchQuery,
    isConnected,
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
    deleteMessage,
  } = useSocketMessenger();

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
        <ChatList
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={selectChat}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewChat={() => setShowNewChatModal(true)}
        />

        <ChatWindow
          selectedChat={selectedChat}
          messages={messages}
          sending={sending}
          loading={loading}
          typingUsers={typingUsers}
          isConnected={isConnected}
          messagesEndRef={messagesEndRef}
          onSendMessage={sendMessage}
          onTyping={handleTyping}
          onLoadMore={loadMoreMessages}
          hasMore={hasMore}
          loadingMore={loadingMore}
          onDeleteMessage={deleteMessage}
          onToggleInfo={() => setShowChatInfo(!showChatInfo)}
        />

        {showChatInfo && selectedChat && (
          <ChatInfo
            chat={selectedChat}
            onClose={() => setShowChatInfo(false)}
          />
        )}
      </div>

      {showNewChatModal && (
        <NewChatModal
          onClose={() => setShowNewChatModal(false)}
          onStartChat={(user) => {
            // Handle new chat
            setShowNewChatModal(false);
          }}
        />
      )}
    </Layout>
  );
};

const Messenger = () => {
  return (
    <SocketProvider>
      <MessengerContent />
    </SocketProvider>
  );
};

export default Messenger;