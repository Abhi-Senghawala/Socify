import React, { useState } from "react";
import {
  Home,
  Search,
  Clapperboard,
  User,
  Heart,
  PlusSquare,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MobileBottomBar = () => {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Search, path: "/search", label: "Search" },
    { icon: PlusSquare, path: "/create", label: "Create", isSpecial: true },
    { icon: Clapperboard, path: "/reels", label: "Reels" },
    { icon: User, path: "/profile", label: "Profile", hasLogout: true },
  ];

  const handleLogout = () => {
    // Clear any auth tokens/storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/90 to-transparent backdrop-blur-xl border-t border-white/10"></div>

      {/* Gradient glow */}
      <div className="absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-purple-600/20 to-transparent blur-xl"></div>

      {/* Navigation items */}
      <div className="relative z-10 flex justify-around items-center h-16 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          if (item.isSpecial) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative group -mt-8"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} className="text-white" />
                </div>
              </Link>
            );
          }

          if (item.hasLogout) {
            return (
              <div key={item.path} className="relative">
                <button
                  onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                  className="relative group p-2"
                >
                  <div
                    className={`relative transition-all duration-300 group-hover:scale-110
                    ${active ? "text-purple-400" : "text-gray-400 group-hover:text-white"}
                  `}
                  >
                    <Icon size={24} />

                    {/* Active indicator dot */}
                    {active && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    )}
                  </div>
                </button>

                {/* Logout menu */}
                {showLogoutMenu && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-48 p-4 bg-gray-900 rounded-xl border border-white/10 shadow-2xl animate-slideUp">
                    <div className="flex flex-col gap-3">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => setShowLogoutMenu(false)}
                      >
                        <User size={18} className="text-purple-400" />
                        <span className="text-sm text-white">View Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => setShowLogoutMenu(false)}
                      >
                        <Heart size={18} className="text-pink-400" />
                        <span className="text-sm text-white">Settings</span>
                      </Link>
                      <div className="border-t border-white/10 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors w-full"
                      >
                        <LogOut size={18} className="text-red-400" />
                        <span className="text-sm text-red-400">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link key={item.path} to={item.path} className="relative group p-2">
              <div
                className={`relative transition-all duration-300 group-hover:scale-110
                ${active ? "text-purple-400" : "text-gray-400 group-hover:text-white"}
              `}
              >
                <Icon size={24} />

                {/* Active indicator dot */}
                {active && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                )}
              </div>

              {/* Label tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10 shadow-xl">
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomBar;
