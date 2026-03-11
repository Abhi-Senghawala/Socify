import React from "react";
import {
  Bell,
  Settings,
  CheckCheck,
  MoreHorizontal,
  Wifi,
  WifiOff,
} from "lucide-react";

const NotificationHeader = ({
  unreadCount,
  onMarkAllRead, 
  onToggleSettings,
  showSettings,
  isConnected,
}) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={22} className="text-purple-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm lg:text-lg">Notifications</h2>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              {isConnected ? (
                <>
                  <Wifi size={10} className="text-green-400" />
                  <span>Live updates</span>
                </>
              ) : (
                <>
                  <WifiOff size={10} className="text-red-400" />
                  <span className="text-sm lg:text-lg">Reconnecting...</span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead} 
              className="flex items-center gap-2 px-2 py-1 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              title="Mark all as read"
            >
              <CheckCheck size={16} className="text-gray-400" />
              <span className="text-sm text-gray-300 hidden sm:inline">
                Mark all read
              </span>
            </button>
          )}

          <button
            onClick={onToggleSettings}
            className={`p-1 rounded-xl transition-all ${
              showSettings
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            <Settings size={18} />
          </button>

          <button className="p-1 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
            <MoreHorizontal size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationHeader;
