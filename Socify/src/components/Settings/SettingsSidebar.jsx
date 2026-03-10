import React from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  Eye,
  Palette,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router";

const SettingsSidebar = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate(); 

  const sections = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "account", icon: Lock, label: "Account" },
    { id: "privacy", icon: Eye, label: "Privacy" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "appearance", icon: Palette, label: "Appearance" },
    { id: "security", icon: Shield, label: "Security" },
    { id: "help", icon: HelpCircle, label: "Help & Support" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-full lg:w-64 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
      <h2 className="text-white font-semibold text-lg mb-4 px-2">Settings</h2>

      <nav className="space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} className={isActive ? "text-purple-400" : ""} />
              <span className="text-sm font-medium">{section.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-6 pt-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsSidebar;
