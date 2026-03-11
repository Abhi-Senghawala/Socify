import React from "react";
import { Globe, Users, Lock } from "lucide-react";

const PrivacySelector = ({ privacy, onChange }) => {
  const options = [
    {
      value: "public",
      icon: Globe,
      label: "Public",
      description: "Anyone can see",
    },
    {
      value: "followers",
      icon: Users,
      label: "Followers",
      description: "Only followers",
    },
    { value: "private", icon: Lock, label: "Private", description: "Only you" },
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
      <h3 className="text-white font-semibold text-sm mb-3">Privacy</h3>

      <div className="grid grid-cols-1 gap-2">
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = privacy === option.value;

          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                isActive
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  isActive ? "bg-purple-500" : "bg-white/5"
                }`}
              >
                <Icon
                  size={16}
                  className={isActive ? "text-white" : "text-gray-400"}
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white text-sm font-medium">{option.label}</p>
                <p className="text-xs text-gray-400">{option.description}</p>
              </div>
              {isActive && (
                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PrivacySelector;
