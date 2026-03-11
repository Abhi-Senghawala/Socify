import React from "react";
import { CheckCircle, X } from "lucide-react";

const CreateSuccess = ({ type, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gray-900 rounded-2xl border border-white/10 p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <X size={20} className="text-gray-400" />
        </button>

        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-bounceIn mb-6">
          <CheckCircle size={40} className="text-white" />
        </div>

        <h2 className="text-white font-bold text-2xl mb-2">
          {type === "post" && "Post Created!"}
          {type === "story" && "Story Shared!"}
          {type === "reel" && "Reel Published!"}
        </h2>

        <p className="text-gray-400 mb-6">
          {type === "post" && "Your post has been shared with your followers."}
          {type === "story" && "Your story will be visible for 24 hours."}
          {type === "reel" && "Your reel is now live for everyone to see."}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            View{" "}
            {type === "post" ? "Post" : type === "story" ? "Story" : "Reel"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSuccess;
