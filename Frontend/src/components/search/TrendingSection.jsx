import React from "react";
import { TrendingUp, Users, Hash } from "lucide-react";

const TrendingSection = ({ trending, onHashtagClick }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} className="text-pink-400" />
        <h3 className="text-white font-semibold">Trending Today</h3>
      </div>

      <div className="space-y-4">
        {trending.map((item) => (
          <button
            key={item.id}
            onClick={() => item.type === "hashtag" && onHashtagClick(item.name)}
            className="w-full flex items-center justify-between group hover:bg-white/5 p-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              {item.type === "hashtag" ? (
                <Hash size={16} className="text-purple-400" />
              ) : (
                <Users size={16} className="text-blue-400" />
              )}
              <div className="text-left">
                <p className="text-white text-sm font-medium">{item.name}</p>
                <p className="text-gray-500 text-xs">{item.category}</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">{item.posts} posts</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
