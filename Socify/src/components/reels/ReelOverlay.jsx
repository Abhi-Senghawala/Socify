import React, { useState, useEffect } from "react";
import { Music, MoreHorizontal, UserPlus, UserCheck } from "lucide-react";
import { formatNumber } from "../../utils/numberUtils";

const ReelOverlay = ({ reel, isFollowing, onFollow, onMoreClick }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowFullDescription(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showFullDescription, isMobile]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/80 via-transparent to-transparent p-3 sm:p-4">
      <div
        className={`flex items-start ${isMobile ? "flex-col" : "flex-row"} justify-between gap-2`}
      >
        <div
          className={`flex items-start gap-2 sm:gap-3 w-full ${isMobile ? "mb-2" : ""}`}
        >
          <div className="relative flex-shrink-0">
            <img
              src={reel.user.avatar}
              alt={reel.user.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20"
            />
            {reel.user.verified && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-black">
                <span className="text-white text-[6px] sm:text-[8px]">✓</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            {" "}
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              <h3 className="text-white font-semibold text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                {reel.user.username}
              </h3>
              <span className="text-[10px] sm:text-xs text-gray-300 whitespace-nowrap">
                {reel.user.followers} followers
              </span>
            </div>

            <div className="relative">
              <p
                onClick={toggleDescription}
                className={`text-white text-[10px] sm:text-xs mt-1 transition-all ${
                  isMobile && !showFullDescription ? "line-clamp-1" : ""
                }`}
              >
                {reel.description}
              </p>

              {isMobile &&
                reel.description.length > 50 &&
                !showFullDescription && (
                  <button
                    onClick={toggleDescription}
                    className="text-purple-400 text-[8px] mt-0.5"
                  >
                    more...
                  </button>
                )}
            </div>
            <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
              <Music size={10} className="text-purple-400 sm:w-3 sm:h-3" />
              <span className="text-[8px] sm:text-xs text-gray-300 truncate max-w-[150px] sm:max-w-[200px]">
                {reel.song}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`flex ${isMobile ? "flex-row w-full justify-end" : "flex-col"} items-center gap-1 sm:gap-2`}
        >
          <button
            onClick={onFollow}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap ${
              isFollowing
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25"
            }`}
          >
            {isFollowing ? (
              <div className="flex items-center gap-0.5 sm:gap-1">
                <UserCheck size={10} className="sm:w-3 sm:h-3" />
                <span className="hidden xs:inline">Following</span>
                <span className="xs:hidden">✓</span>
              </div>
            ) : (
              <div className="flex items-center gap-0.5 sm:gap-1">
                <UserPlus size={10} className="sm:w-3 sm:h-3" />
                <span className="hidden xs:inline">Follow</span>
                <span className="xs:hidden">+</span>
              </div>
            )}
          </button>
          <button
            onClick={onMoreClick}
            className="p-1 sm:p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="More options"
          >
            <MoreHorizontal size={14} className="sm:w-4 sm:h-4 text-white" />
          </button>
        </div>
      </div>

      {isMobile && showFullDescription && (
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"
          style={{ width: "30%", margin: "0 auto" }}
        />
      )}
    </div>
  );
};

export default ReelOverlay;
