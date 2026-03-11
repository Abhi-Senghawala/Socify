import React, { useState } from "react";
import { Hash, AtSign, Smile } from "lucide-react";

const CaptionInput = ({ value, onChange }) => {
  const [showHashtags, setShowHashtags] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const suggestions = [
    "#photography",
    "#travel",
    "#love",
    "#instagood",
    "#fashion",
    "#beautiful",
    "#happy",
    "#cute",
    "#tbt",
    "#followme",
  ];

  const handleKeyDown = (e) => {
    if (e.key === "#" && !showHashtags) {
      setShowHashtags(true);
    }
  };

  const insertHashtag = (tag) => {
    const text = value;
    const before = text.substring(0, cursorPosition);
    const after = text.substring(cursorPosition);
    const newText = before + tag + " " + after;
    onChange(newText);
    setShowHashtags(false);
  };

  const countChars = value.length;
  const maxChars = 2200;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
      <h3 className="text-white font-semibold text-sm mb-3">Caption</h3>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onSelect={(e) => setCursorPosition(e.target.selectionStart)}
          placeholder="Write a caption..."
          rows="4"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
        />

        {showHashtags && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-xl border border-white/10 shadow-2xl overflow-hidden z-10">
            <div className="p-2">
              <p className="text-xs text-gray-400 mb-2 px-2">
                Popular hashtags
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => insertHashtag(tag)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-purple-400 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
            <Hash size={16} className="text-gray-400" />
          </button>
          <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
            <AtSign size={16} className="text-gray-400" />
          </button>
          <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
            <Smile size={16} className="text-gray-400" />
          </button>
        </div>
        <span
          className={`text-xs ${
            countChars > maxChars ? "text-red-400" : "text-gray-400"
          }`}
        >
          {countChars}/{maxChars}
        </span>
      </div>
    </div>
  );
};

export default CaptionInput;
