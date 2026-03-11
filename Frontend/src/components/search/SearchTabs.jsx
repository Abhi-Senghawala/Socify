import React from "react";
import { Globe, Users, Image, Hash, Video } from "lucide-react";

const SearchTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "top", icon: Globe, label: "Top" },
    { id: "users", icon: Users, label: "Users" },
    { id: "posts", icon: Image, label: "Posts" },
    { id: "hashtags", icon: Hash, label: "Hashtags" },
    { id: "reels", icon: Video, label: "Reels" },
  ];

  return (
    <div className="border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex lg:hidden overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-all relative min-w-[80px] ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                )}
              </button>
            );
          })}
        </div>
        <div className="hidden lg:flex gap-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 text-sm font-medium transition-all relative ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchTabs;
