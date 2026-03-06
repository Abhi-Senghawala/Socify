import React, { useState } from "react";
import { X, UserPlus, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useFeed } from "../../context/FeedContext";
import About from "../../pages/About/About";

const SuggestionCard = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
            {user.avatar}
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <p className="text-white text-xs sm:text-sm font-semibold truncate">
              {user.username}
            </p>
            <ChevronRight size={12} className="text-gray-600 flex-shrink-0" />
          </div>
          <p className="text-xs text-gray-500 truncate">
            Followed by {user.followedBy[0]}
            {user.followedBy.length > 1 &&
              ` +${user.followedBy.length - 1} more`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 ml-2 flex-shrink-0">
        <button
          onClick={() => setFollowed(!followed)}
          className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
            followed
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25"
          }`}
        >
          {followed ? "Following" : "Follow"}
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={14} className="text-gray-500 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

const SuggestionsSidebar = () => {
  const { suggestions } = useFeed();
  const [showAll, setShowAll] = useState(false);

  const displayedSuggestions = showAll ? suggestions : suggestions.slice(0, 5);

  return (
    <div className="hidden lg:block w-80 ml-8 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src="https://i.pinimg.com/736x/43/d4/ae/43d4aeafda2af963392f20c2fd01a061.jpg"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-base sm:text-lg"
              ></img>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm sm:text-base truncate">
                Its_Kasak
              </p>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                Kasak Rani
              </p>
            </div>
          </div>
          <button className="text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity flex-shrink-0 ml-2">
            Switch
          </button>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs sm:text-sm font-semibold text-gray-400">
              Suggested for you
            </p>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-white hover:text-gray-300 transition-colors"
            >
              {showAll ? "See less" : "See all"}
            </button>
          </div>
          <div className="space-y-4">
            {displayedSuggestions.map((user) => (
              <SuggestionCard key={user.id} user={user} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-600">
            <Link to="/about" className="hover:underline whitespace-nowrap">
              About
            </Link>
            <span>·</span>
            <a href="#" className="hover:underline whitespace-nowrap">
              Help
            </a>
            <span>·</span>
            <a href="#" className="hover:underline whitespace-nowrap">
              Press
            </a>
            <span>·</span>
            <a href="#" className="hover:underline whitespace-nowrap">
              API
            </a>
            <span>·</span>
            <a href="#" className="hover:underline whitespace-nowrap">
              Jobs
            </a>
            <span>·</span>
            <a href="#" className="hover:underline whitespace-nowrap">
              Privacy
            </a>
            <span>·</span>
            <a href="#" className="hover:underline whitespace-nowrap">
              Terms
            </a>
            <span>·</span>
            <a href="#" className="hover:underline whitespace-nowrap">
              Locations
            </a>
            <span>·</span>
            <a href="#" className="hover:underline whitespace-nowrap">
              Language
            </a>
            <span>·</span>
            <a href="#" className="hover:underline whitespace-nowrap">
              Socify Verified
            </a>
          </div>

          <p className="text-xs text-gray-600">
            &copy; 2026 <span className="text-purple-400">SOCIFY</span> | Develope By <span className="text-pink-400">ABHI</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsSidebar;
