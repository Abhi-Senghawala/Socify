import React from "react";
import { Link } from "react-router";
import { Heart, MessageCircle, MapPin, Play } from "lucide-react";

const PostSearchCard = ({ post }) => {
  return (
    <Link
      to={`/post/${post.id}`}
      className="flex gap-4 p-4 hover:bg-white/5 transition-colors rounded-xl group"
    >
      <div className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden">
        <img
          src={post.image}
          alt="Post"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {post.type === "video" && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play size={16} className="text-white ml-0.5" />
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white text-sm font-semibold">
            {post.user.username}
          </span>
          {post.user.verified && (
            <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full">
              ✓
            </span>
          )}
        </div>

        <p className="text-gray-300 text-sm line-clamp-2 mb-2">
          {post.caption}
        </p>

        {post.location && (
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
            <MapPin size={12} />
            <span>{post.location}</span>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Heart size={14} />
            <span>{post.likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <MessageCircle size={14} />
            <span>{post.comments}</span>
          </div>
          <span className="text-gray-500 text-xs">
            {new Date(post.timestamp).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostSearchCard;
