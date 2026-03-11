import React, { useState, useEffect } from "react";
import {
  Heart,
  CirclePlus,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MobileTopbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    navigate("/login");
  };

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50">
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/95 backdrop-blur-xl border-b border-white/10"
            : "bg-gradient-to-b from-gray-900/90 to-transparent"
        }`}
      ></div>
      <div className="absolute inset-x-0 -bottom-10 h-10 bg-gradient-to-b from-purple-600/20 to-transparent blur-xl"></div>
      <div className="relative z-10 flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          <Link to="/create" className="flex items-center text-center gap-2 group">
            <div className="relative">
              <CirclePlus className="text-white h-5 w-5" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
            </div>
          </Link>
        </div>
        <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          SOCIFY
        </h1>
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Link
            to="/notifications"
            className="relative w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
          >
            <Heart
              size={16}
              className="text-gray-400 group-hover:text-white group-hover:scale-110 transition-all"
            />

            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold border-2 border-gray-900">
              3
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileTopbar;
