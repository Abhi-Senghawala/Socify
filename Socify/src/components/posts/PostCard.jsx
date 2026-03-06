import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
  Smile,
} from "lucide-react";
import { useFeed } from "../../context/FeedContext";

const PostCard = ({ post }) => {
  const { likedPosts, savedPosts, toggleLike, toggleSave, addComment } =
    useFeed();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const isLiked = likedPosts.has(post.id);
  const isSaved = savedPosts.has(post.id);

  const handleLike = () => toggleLike(post.id);
  const handleSave = () => toggleSave(post.id);

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(post.id, commentText.trim());
      setCommentText("");
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden mb-4 sm:mb-6 group">
      <div className="p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
            {post.user.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-2">
              <h3 className="text-white font-semibold text-sm sm:text-base">
                {post.user.username}
              </h3>
              {post.user.verified && (
                <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full">
                  ✓
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">
              {post.location} • {post.timeAgo}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
      <div className="relative aspect-square bg-gray-800">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={post.image}
          alt="Post"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={handleLike} className="group">
              <Heart
                size={20}
                className={`sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110 ${
                  isLiked
                    ? "fill-pink-500 text-pink-500"
                    : "text-gray-400 group-hover:text-white"
                }`}
              />
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="group"
            >
              <MessageCircle
                size={20}
                className="sm:w-6 sm:h-6 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300"
              />
            </button>
            <button className="group">
              <Send
                size={20}
                className="sm:w-6 sm:h-6 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300"
              />
            </button>
          </div>
          <button onClick={handleSave} className="group">
            <Bookmark
              size={20}
              className={`sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110 ${
                isSaved
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400 group-hover:text-white"
              }`}
            />
          </button>
        </div>
        <p className="text-white font-semibold text-sm sm:text-base mb-2">
          {post.likes.toLocaleString()} likes
        </p>
        <div className="mb-2 sm:mb-3">
          <span className="text-white font-semibold text-sm sm:text-base mr-2">
            {post.user.username}
          </span>
          <span className="text-gray-300 text-xs sm:text-sm">
            {post.content}
          </span>
        </div>
        {post.comments.length > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 hover:text-gray-300 transition-colors"
          >
            View all {post.comments.length} comments
          </button>
        )}
        {showComments && (
          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 max-h-48 sm:max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-1 sm:gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {comment.userAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    <span className="text-white text-xs sm:text-sm font-semibold">
                      {comment.username}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm break-words">
                    {comment.text}
                  </p>
                </div>
                <button className="text-gray-500 hover:text-pink-500 flex-shrink-0">
                  <Heart size={12} className="sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
        <form
          onSubmit={handleComment}
          className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-white/10"
        >
          <Smile
            size={18}
            className="sm:w-5 sm:h-5 text-gray-400 hover:text-white cursor-pointer transition-colors flex-shrink-0"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 bg-transparent text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none min-w-0"
          />
          {commentText.trim() && (
            <button
              type="submit"
              className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity flex-shrink-0"
            >
              Post
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostCard;
