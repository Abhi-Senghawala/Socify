import React, { useState } from "react";
import { X, Upload, Music, User, Globe, Lock } from "lucide-react";

const ReelUploadModal = ({ onClose }) => {
  const [caption, setCaption] = useState("");
  const [song, setSong] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("video/")) {
        setFile(selectedFile);
      } else {
        alert("Please select a video file");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a video");
      return;
    }

    setUploading(true);

    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl border border-white/10">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-semibold">Upload Reel</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              id="video-upload"
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <Upload size={32} className="mx-auto text-purple-400 mb-2" />
              <p className="text-white font-medium">
                {file ? file.name : "Click to select video"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Max size: 100MB • MP4, MOV
              </p>
            </label>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              rows="3"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Song</label>
            <div className="relative">
              <Music
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={song}
                onChange={(e) => setSong(e.target.value)}
                placeholder="Add music"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Privacy</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPrivacy("public")}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  privacy === "public"
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <Globe
                  size={16}
                  className={
                    privacy === "public" ? "text-purple-400" : "text-gray-400"
                  }
                />
                <span className="text-white text-sm">Public</span>
              </button>
              <button
                onClick={() => setPrivacy("private")}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  privacy === "private"
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <Lock
                  size={16}
                  className={
                    privacy === "private" ? "text-purple-400" : "text-gray-400"
                  }
                />
                <span className="text-white text-sm">Private</span>
              </button>
            </div>
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 text-center">
                Uploading... {progress}%
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Upload Reel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelUploadModal;
