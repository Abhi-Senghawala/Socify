import React from "react";
import Layout from "../../components/layout/Layout";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationHeader from "../../components/notifications/NotificationHeader";
import NotificationFilters from "../../components/notifications/NotificationFilters";
import NotificationCard from "../../components/notifications/NotificationCard";
import NotificationSettings from "../../components/notifications/NotificationSettings";
import EmptyNotifications from "../../components/notifications/EmptyNotification";
import NotificationSkeleton from "../../components/notifications/NotificationSkeleton";

const Notifications = () => {
  const {
    notifications,
    loading,
    filter,
    unreadCount,
    hasMore,
    loadingMore,
    showSettings,
    isConnected,
    setFilter,
    setShowSettings,
    markAsRead,
    markAllAsRead, 
    deleteNotification,
    loadMore,
    updateSettings,
    settings,
  } = useNotifications();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filters (Desktop) */}
          <div className="hidden lg:block lg:w-64">
            <NotificationFilters
              filter={filter}
              onFilterChange={setFilter}
              unreadCount={unreadCount}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <NotificationHeader
              unreadCount={unreadCount}
              onMarkAllRead={markAllAsRead} // Changed from markAllRead to markAllAsRead
              onToggleSettings={() => setShowSettings(!showSettings)}
              showSettings={showSettings}
              isConnected={isConnected}
            />

            {/* Settings Panel */}
            {showSettings && (
              <div className="mt-4">
                <NotificationSettings
                  settings={settings}
                  onUpdate={updateSettings}
                  onClose={() => setShowSettings(false)}
                />
              </div>
            )}

            {/* Filters (Mobile) */}
            <div className="lg:hidden mt-4">
              <NotificationFilters
                filter={filter}
                onFilterChange={setFilter}
                unreadCount={unreadCount}
              />
            </div>

            {/* Notifications List */}
            <div className="mt-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              {loading ? (
                <NotificationSkeleton />
              ) : notifications.length > 0 ? (
                <>
                  {notifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onMarkRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))}

                  {/* Load More */}
                  {hasMore && (
                    <div className="p-4 text-center border-t border-white/10">
                      <button
                        onClick={loadMore}
                        disabled={loadingMore}
                        className="px-4 py-2 bg-white/5 text-gray-300 text-sm rounded-lg hover:bg-white/10 transition-all disabled:opacity-50"
                      >
                        {loadingMore ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading...</span>
                          </div>
                        ) : (
                          "Load More"
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <EmptyNotifications filter={filter} />
              )}
            </div>

            {/* Connection Status */}
            {!isConnected && (
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm text-yellow-400 text-center">
                  Reconnecting to notification service...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
