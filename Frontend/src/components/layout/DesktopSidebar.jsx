import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  SquarePlay,
  Send,
  User,
  Heart,
  Sparkles,
  LogOut,
  Settings,
  PlusSquare,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const DesktopSidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Search", icon: Search, path: "/search" },
    { name: "Reels", icon: SquarePlay, path: "/reels" },
    { name: "Messenger", icon: Send, path: "/messenger" },
    { name: "Notifications", icon: Heart, path: "/notifications" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  const bottomItems = [
    { name: "Create", icon: PlusSquare, path: "/create" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/login");
  };

  const ThemeToggle = () => {
    return (
      <button
        onClick={toggleTheme}
        className="relative group flex items-center gap-4 p-3 w-full rounded-xl hover:bg-white/5 transition-all duration-300"
      >
        <div className="text-gray-400 group-hover:text-yellow-400 transition-colors group-hover:scale-110">
          {theme === "dark" ? (
            <Sun
              size={22}
              className="group-hover:rotate-90 transition-transform duration-500"
            />
          ) : (
            <Moon
              size={22}
              className="group-hover:rotate-12 transition-transform duration-500"
            />
          )}
        </div>

        {expanded && (
          <span className="text-gray-400 group-hover:text-white font-medium transition-colors">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        )}

        {!expanded && (
          <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10 shadow-xl">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </div>
        )}
      </button>
    );
  };

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        setExpanded(false);
        setShowLogoutConfirm(false);
      }}
      className={`hidden md:flex fixed left-0 top-0 h-screen flex-col transition-all duration-500 ease-in-out z-50
        ${expanded ? "w-64" : "w-20"}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95 backdrop-blur-xl border-r border-white/10"></div>

      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-r-3xl blur-xl opacity-30"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="h-20 flex items-center px-4 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles
                className={`w-8 h-8 text-purple-400 group-hover:rotate-12 transition-transform duration-300 ${expanded ? "mr-2" : "mx-auto"}`}
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
            </div>
            {expanded && (
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Socify
              </span>
            )}
          </Link>
        </div>
        <div className="flex-1 flex flex-col gap-2 mt-8 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative group flex items-center gap-4 p-3 rounded-xl transition-all duration-300
                  ${
                    active
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10"
                      : "hover:bg-white/5"
                  }
                `}
              >
                {active && (
                  <div className="absolute left-0 w-1 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-r-full"></div>
                )}

                <div
                  className={`relative transition-transform duration-300 group-hover:scale-110
                  ${active ? "text-purple-400" : "text-gray-400 group-hover:text-white"}
                `}
                >
                  <Icon size={24} />
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity
                    ${active ? "opacity-50" : ""}
                  `}
                  ></div>
                </div>
                {expanded && (
                  <span
                    className={`font-medium transition-colors duration-300
                    ${active ? "text-white" : "text-gray-400 group-hover:text-white"}
                  `}
                  >
                    {item.name}
                  </span>
                )}

                {!expanded && (
                  <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10 shadow-xl">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto mb-6 px-3 space-y-2">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative group flex items-center gap-4 p-3 rounded-xl transition-all duration-300
                  ${
                    active
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10"
                      : "hover:bg-white/5"
                  }
                `}
              >
                <div
                  className={`transition-transform duration-300 group-hover:scale-110
                  ${active ? "text-purple-400" : "text-gray-400 group-hover:text-white"}
                `}
                >
                  <Icon size={22} />
                </div>

                {expanded && (
                  <span
                    className={`font-medium transition-colors duration-300
                    ${active ? "text-white" : "text-gray-400 group-hover:text-white"}
                  `}
                  >
                    {item.name}
                  </span>
                )}

                {!expanded && (
                  <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10 shadow-xl">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}

          <ThemeToggle />
          <div className="relative">
            <button
              onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}
              className="relative group flex items-center gap-4 p-3 w-full rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              <div className="text-gray-400 group-hover:text-red-400 transition-colors group-hover:scale-110">
                <LogOut size={22} />
              </div>
              {expanded && (
                <span className="text-gray-400 group-hover:text-red-400 font-medium transition-colors">
                  Logout
                </span>
              )}
              {!expanded && (
                <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10 shadow-xl">
                  Logout
                </div>
              )}
            </button>

            {showLogoutConfirm && expanded && (
              <div className="absolute bottom-full left-0 right-0 mb-2 p-4 bg-gray-900 rounded-xl border border-white/10 shadow-2xl animate-slideUp">
                <p className="text-sm text-gray-300 mb-3">
                  Are you sure you want to logout?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all"
                  >
                    Yes, Logout
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-3 py-2 bg-white/5 text-gray-300 text-sm rounded-lg hover:bg-white/10 transition-all border border-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User profile preview (when expanded)
        {expanded && (
          <div className="mx-3 mb-4 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-400 truncate">@johndoe</p>
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Logout confirmation for collapsed state */}
      {showLogoutConfirm && !expanded && (
        <div className="absolute left-20 bottom-24 ml-2 p-4 bg-gray-900 rounded-xl border border-white/10 shadow-2xl animate-slideUp w-48">
          <p className="text-sm text-gray-300 mb-3">Logout?</p>
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all"
            >
              Yes
            </button>
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="flex-1 px-3 py-2 bg-white/5 text-gray-300 text-xs rounded-lg hover:bg-white/10 transition-all border border-white/10"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopSidebar;
