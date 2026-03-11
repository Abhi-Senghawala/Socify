import React, { useState } from "react";
import { X, Heart, Send } from "lucide-react";

const ReelComments = ({ reel, onClose }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        username: "alexj",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        verified: true,
      },
      text: "This is amazing! 🔥",
      likes: 124,
      timestamp: "2h ago",
      liked: false,
    },
    {
      id: 2,
      user: {
        username: "sarahc",
        avatar:
          "https://images.unsplash.com/photo-1494790108777-296fd3c5c1b2?w=100",
        verified: false,
      },
      text: "Love this! 😍",
      likes: 89,
      timestamp: "1h ago",
      liked: true,
    },
    {
      id: 3,
      user: {
        username: "miker",
        avatar:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
        verified: true,
      },
      text: "How did you do that?",
      likes: 56,
      timestamp: "45m ago",
      liked: false,
    },
  ]);

  const [likedComments, setLikedComments] = useState(new Set([2]));

  const handleLikeComment = (commentId) => {
    setLikedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.likes + (likedComments.has(commentId) ? -1 : 1),
            }
          : comment,
      ),
    );
  };

  const handleSendComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: {
          username: "current_user",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
          verified: false,
        },
        text: commentText,
        likes: 0,
        timestamp: "Just now",
        liked: false,
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-semibold">
            Comments ({reel.comments})
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <img
                src={comment.user.avatar}
                alt={comment.user.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-semibold">
                    {comment.user.username}
                  </span>
                  {comment.user.verified && (
                    <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full">
                      ✓
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mt-1">{comment.text}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center gap-1"
                  >
                    <Heart
                      size={14}
                      className={
                        likedComments.has(comment.id)
                          ? "fill-pink-500 text-pink-500"
                          : "text-gray-400"
                      }
                    />
                    <span className="text-xs text-gray-400">
                      {comment.likes}
                    </span>
                  </button>
                  <button className="text-xs text-gray-400 hover:text-white">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
              alt="Your avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              onKeyPress={(e) => e.key === "Enter" && handleSendComment()}
            />
            <button
              onClick={handleSendComment}
              disabled={!commentText.trim()}
              className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelComments;
