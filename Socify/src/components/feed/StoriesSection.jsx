import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import { useFeed } from "../../context/FeedContext";

const StoryAvatar = ({ story, isFirst }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col items-center gap-1 group cursor-pointer flex-shrink-0">
      <div
        className={`relative p-[2px] rounded-full ${
          story.seen
            ? "bg-gray-600"
            : "bg-gradient-to-r from-purple-500 to-pink-500"
        }`}
      >
        <div className="relative">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-gray-900 overflow-hidden">
            {story.image && !imageError ? (
              <img
                src={story.image}
                alt={story.username}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm sm:text-base`}
              >
                {story.avatar}
              </div>
            )}
          </div>
          {isFirst && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-gray-900">
              <PlusCircle size={12} className="sm:w-3.5 sm:h-3.5 text-white" />
            </div>
          )}
        </div>
      </div>
      <span className="text-xs text-gray-400 truncate max-w-[60px] sm:max-w-[70px]">
        {story.username.length > 10
          ? `${story.username.substring(0, 8)}...`
          : story.username}
      </span>
    </div>
  );
};

const StoriesSection = () => {
  const { stories } = useFeed();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative mb-4 sm:mb-6 group -mx-4 sm:mx-0">
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:opacity-100"
        >
          <ChevronLeft size={16} className="sm:w-4 sm:h-4 text-white" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4 sm:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={checkScroll}
      >
        {stories.map((story, index) => (
          <StoryAvatar key={story.id} story={story} isFirst={index === 0} />
        ))}
      </div>
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:opacity-100"
        >
          <ChevronRight size={16} className="sm:w-4 sm:h-4 text-white" />
        </button>
      )}
    </div>
  );
};

export default StoriesSection;
