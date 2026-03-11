import React from "react";
import { Link } from "react-router";

const HashtagSearchCard = ({ hashtag }) => {
  return (
    <Link
      to={`/hashtag/${hashtag.name.replace("#", "")}`}
      className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors rounded-xl group"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/10">
        <span className="text-2xl text-purple-400">#</span>
      </div>

      <div className="flex-1">
        <h3 className="text-white font-semibold text-lg">{hashtag.name}</h3>
        <p className="text-gray-400 text-sm">
          {hashtag.postsCount.toLocaleString()} posts
        </p>
      </div>

      {hashtag.topPost && (
        <div className="relative w-14 h-14 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
          <img
            src={hashtag.topPost.image}
            alt="Top post"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Heart size={16} className="text-white" />
            <span className="text-white text-xs ml-1">
              {hashtag.topPost.likes.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </Link>
  );
};

export default HashtagSearchCard;
