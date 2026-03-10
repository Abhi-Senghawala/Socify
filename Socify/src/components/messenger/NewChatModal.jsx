import React, { useState } from "react";
import { X, Search, UserPlus } from "lucide-react";

const NewChatModal = ({ onClose, onStartChat }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock users for demo
  const mockUsers = [
    {
      id: "201",
      name: "Alex Johnson",
      username: "alexj",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      isOnline: true,
    },
    {
      id: "202",
      name: "Sarah Chen",
      username: "sarahc",
      avatar:
        "https://images.unsplash.com/photo-1494790108777-296fd3c5c1b2?w=100",
      isOnline: false,
    },
    {
      id: "203",
      name: "Mike Rivera",
      username: "miker",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
      isOnline: true,
    },
    {
      id: "204",
      name: "Emma Wilson",
      username: "emmaw",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      isOnline: false,
    },
    {
      id: "205",
      name: "David Kim",
      username: "davidk",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      isOnline: true,
    },
  ];

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUsers(
        mockUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.username.toLowerCase().includes(query.toLowerCase()),
        ),
      );
      setLoading(false);
    } else {
      setUsers([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-gray-900 rounded-2xl border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-semibold text-lg">New Message</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search people..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              autoFocus
            />
          </div>
        </div>

        {/* Users List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : users.length > 0 ? (
            users.map((user) => (
              <button
                key={user.id}
                onClick={() => onStartChat(user)}
                className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {user.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-white font-semibold">{user.name}</h4>
                  <p className="text-sm text-gray-400">@{user.username}</p>
                </div>
                <UserPlus size={18} className="text-gray-400" />
              </button>
            ))
          ) : searchQuery ? (
            <p className="text-center text-gray-400 py-8">No users found</p>
          ) : (
            <p className="text-center text-gray-400 py-8">
              Type to search users
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
