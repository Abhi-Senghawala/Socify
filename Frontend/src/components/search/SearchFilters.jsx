import React from "react";
import { X, Filter } from "lucide-react";

const SearchFilters = ({ filters, onFilterChange, onClose }) => {
  const handleUserFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      users: { ...filters.users, [key]: value },
    });
  };

  const handlePostFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      posts: { ...filters.posts, [key]: value },
    });
  };

  const handleHashtagFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      hashtags: { ...filters.hashtags, [key]: value },
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      users: { verified: false, followedBy: "anyone", location: "" },
      posts: { date: "any", type: "all", sortBy: "recent" },
      hashtags: { sortBy: "popular" },
    });
  };

  return (
    <div className="lg:w-80 border-l border-white/10 bg-gray-900/50 backdrop-blur-sm h-full overflow-y-auto">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-purple-400" />
          <h3 className="text-white font-semibold">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearAllFilters}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Users</h4>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.users.verified}
                onChange={(e) =>
                  handleUserFilterChange("verified", e.target.checked)
                }
                className="w-4 h-4 rounded border-white/30 bg-white/5 text-purple-500 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-300">Verified only</span>
            </label>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Followed by
              </label>
              <select
                value={filters.users.followedBy}
                onChange={(e) =>
                  handleUserFilterChange("followedBy", e.target.value)
                }
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="anyone">Anyone</option>
                <option value="following">People you follow</option>
                <option value="followers">Your followers</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Location
              </label>
              <input
                type="text"
                value={filters.users.location}
                onChange={(e) =>
                  handleUserFilterChange("location", e.target.value)
                }
                placeholder="City or country"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-white/10">
          <h4 className="text-white text-sm font-semibold mb-3">Posts</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Date posted
              </label>
              <select
                value={filters.posts.date}
                onChange={(e) => handlePostFilterChange("date", e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="any">Any time</option>
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="year">This year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Post type
              </label>
              <select
                value={filters.posts.type}
                onChange={(e) => handlePostFilterChange("type", e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="all">All</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Sort by
              </label>
              <select
                value={filters.posts.sortBy}
                onChange={(e) =>
                  handlePostFilterChange("sortBy", e.target.value)
                }
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="recent">Most recent</option>
                <option value="popular">Most popular</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h4 className="text-white text-sm font-semibold mb-3">Hashtags</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Sort by
              </label>
              <select
                value={filters.hashtags.sortBy}
                onChange={(e) =>
                  handleHashtagFilterChange("sortBy", e.target.value)
                }
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="popular">Most popular</option>
                <option value="recent">Most recent</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
