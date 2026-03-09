import React, { useState } from "react";
import {
  X,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProfilePostModal = ({ post, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full border border-white/10 hover:bg-gray-800 transition-all"
        >
          <X size={20} className="text-white" />
        </button>
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full border border-white/10 hover:bg-gray-800 transition-all">
          <ChevronLeft size={20} className="text-white" />
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full border border-white/10 hover:bg-gray-800 transition-all">
          <ChevronRight size={20} className="text-white" />
        </button>
        <div className="flex flex-col lg:flex-row h-[90vh]">
          <div className="lg:w-3/5 h-1/2 lg:h-full bg-black flex items-center justify-center">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="lg:w-2/5 h-1/2 lg:h-full bg-gray-900/95 backdrop-blur-sm border-l border-white/10 flex flex-col">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div>
                  <p className="text-white font-semibold text-sm">username</p>
                  {post.location && (
                    <p className="text-gray-400 text-xs">{post.location}</p>
                  )}
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0"></div>
                <div>
                  <p className="text-white text-sm">
                    <span className="font-semibold">username</span>{" "}
                    {post.caption}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">2h ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex-shrink-0"></div>
                <div>
                  <p className="text-white text-sm">
                    <span className="font-semibold">user2</span> Amazing shot!
                  </p>
                  <p className="text-gray-500 text-xs mt-1">1h ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsLiked(!isLiked)}>
                    <Heart
                      size={24}
                      className={`transition-all ${
                        isLiked
                          ? "fill-pink-500 text-pink-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button>
                    <MessageCircle size={24} className="text-gray-400" />
                  </button>
                  <button>
                    <Share2 size={24} className="text-gray-400" />
                  </button>
                </div>
                <button onClick={() => setIsSaved(!isSaved)}>
                  <Bookmark
                    size={24}
                    className={`transition-all ${
                      isSaved
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
              <p className="text-white font-semibold text-sm mb-2">
                {post.likes} likes
              </p>
              <p className="text-gray-500 text-xs">{post.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostModal;
