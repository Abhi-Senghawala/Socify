import React from "react";
import { Grid, Film, Bookmark, Heart } from "lucide-react";

const ProfileTabs = ({ activeTab, onTabChange, isCurrentUser }) => {
  const tabs = [
    { id: "posts", icon: Grid, label: "Posts" },
    { id: "reels", icon: Film, label: "Reels" },
    { id: "tagged", icon: Bookmark, label: "Tagged" },
  ];

  if (isCurrentUser) {
    tabs.push({ id: "saved", icon: Heart, label: "Saved" });
  }

  return (
    <div className="border-t border-white/10 mt-6">
      <div className="flex sm:hidden overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 py-4 px-2 text-sm font-medium transition-all relative ${isActive ? "text-white" : "text-gray-400 hover:text-gray-300"}`}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 `bg-gradient-to-r` from-purple-500 to-pink-500"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;
