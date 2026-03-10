import React from "react";
import { Clock, X, TrendingUp } from "lucide-react";

const RecentSearches = ({ searches, onRemove, onClear, onSelect }) => {
  if (searches.length === 0) return null;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Recent Searches</h3>
        <button
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-2">
        {searches.map((search) => (
          <div
            key={search.id}
            className="flex items-center justify-between group hover:bg-white/5 rounded-lg p-2 transition-colors"
          >
            <button
              onClick={() => onSelect(search.term)}
              className="flex items-center gap-3 flex-1"
            >
              {search.type === "hashtag" ? (
                <TrendingUp size={16} className="text-purple-400" />
              ) : (
                <Clock size={16} className="text-gray-400" />
              )}
              <span className="text-gray-300 text-sm">{search.term}</span>
            </button>

            <button
              onClick={() => onRemove(search.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/5 rounded"
            >
              <X size={14} className="text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
