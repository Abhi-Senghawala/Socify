import React from "react";
import { UserPlus, Search, X } from "lucide-react";

const TagPeople = ({
  taggedUsers,
  onRemoveTag,
  showTagModal,
  setShowTagModal,
  searchQuery,
  setSearchQuery,
  suggestedUsers,
  onTagUser,
}) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">Tag People</h3>
        <button
          onClick={() => setShowTagModal(true)}
          className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          <UserPlus size={14} />
          <span>Add</span>
        </button>
      </div>

      {taggedUsers.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {taggedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-sm text-white">{user.username}</span>
              <button
                onClick={() => onRemoveTag(user.id)}
                className="hover:bg-white/10 rounded p-0.5"
              >
                <X size={12} className="text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">No tags added</p>
      )}

      {showTagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gray-900 rounded-2xl border border-white/10">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-semibold">Tag People</h3>
              <button
                onClick={() => setShowTagModal(false)}
                className="p-1 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search people..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  autoFocus
                />
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {suggestedUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => onTagUser(user)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-xs text-gray-400">@{user.username}</p>
                    </div>
                    <UserPlus size={16} className="ml-auto text-purple-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagPeople;
