import React from "react";
import { Heart, MessageCircle, Film, Play } from "lucide-react";

const ProfileGrid = ({ posts, onPostClick, loadingMore }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
          <Film className="text-gray-300" size={32} />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">No Posts Yet</h3>
        <p className="text-gray-400 text-sm">
          When You Post They Will Appear Here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 sm:gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => onPostClick(post)}
          className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg sm:rounded-xl"
        >
          <img
            src={post.image}
            alt="Post"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-around text-white">
              <div className="flex items-center gap-1">
                <Heart size={16} className="fill-white" />
                <span className="text-xs font-medium">{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={16} />
                <span className="text-xs font-medium">{post.comments}</span>
              </div>
            </div>
          </div>

          {post.type === "video" && (
            <div className="absolute top-2 right-2">
              <div className="w-6 h-6 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play size={12} className="text-white ml-0.5" />
              </div>
            </div>
          )}

          {post.type === "carousel" && (
            <div className="absolute top-2 right-2">
              <div className="w-6 h-6 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">📑</span>
              </div>
            </div>
          )}
        </div>
      ))}

      {loadingMore && (
        <div className="col-span-3 py-8 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse animation-delay-200"></div>
            <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse animation-delay-400"></div>
            <span className="text-sm ml-2">Loading more...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileGrid;