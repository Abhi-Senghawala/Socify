import React from "react";
import { Heart, MessageCircle, Share2, Bookmark, Send } from "lucide-react";
import { formatNumber } from "../../utils/numberUtils";

const ReelActions = ({
  reel,
  isLiked,
  isSaved,
  onLike,
  onComment,
  onShare,
  onSave,
}) => {
  return (
    <div className="absolute right-4 bottom-24 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center">
        <button
          onClick={onLike}
          className="p-3 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-all group"
        >
          <Heart
            size={24}
            className={`transition-all group-hover:scale-110 ${
              isLiked ? "fill-pink-500 text-pink-500" : "text-white"
            }`}
          />
        </button>
        <span className="text-white text-xs mt-1">
          {formatNumber(reel.likes)}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={onComment}
          className="p-3 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-all group"
        >
          <MessageCircle
            size={24}
            className="text-white group-hover:scale-110 transition-all"
          />
        </button>
        <span className="text-white text-xs mt-1">
          {formatNumber(reel.comments)}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={onShare}
          className="p-3 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-all group"
        >
          <Send
            size={24}
            className="text-white group-hover:scale-110 transition-all"
          />
        </button>
        <span className="text-white text-xs mt-1">
          {formatNumber(reel.shares)}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={onSave}
          className="p-3 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-all group"
        >
          <Bookmark
            size={24}
            className={`transition-all group-hover:scale-110 ${
              isSaved ? "fill-yellow-400 text-yellow-400" : "text-white"
            }`}
          />
        </button>
        <span className="text-white text-xs mt-1">
          {formatNumber(reel.saves)}
        </span>
      </div>
    </div>
  );
};

export default ReelActions;
