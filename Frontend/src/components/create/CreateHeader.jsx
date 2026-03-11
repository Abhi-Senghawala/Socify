import React from "react";
import { X, Image, Video, Film } from "lucide-react";

const CreateHeader = ({ activeTab, onTabChange, onClose }) => {
  const tabs = [
    { id: "post", icon: Image, label: "Post" },
    { id: "story", icon: Video, label: "Story" },
    { id: "reel", icon: Film, label: "Reel" },
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold text-lg">Create New</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <X size={20} className="text-gray-400" />
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CreateHeader;
