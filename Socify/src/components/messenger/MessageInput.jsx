import React, { useState, useRef, useEffect } from "react";
import { Smile, Image, Paperclip, Mic, Send, X } from "lucide-react";
import EmojiPicker from "./EmojiPicker";

const MessageInput = ({ onSendMessage, onTyping, sending }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);

    // Handle typing indicator
    if (!isTyping) {
      setIsTyping(true);
      onTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTyping(false);
    }, 1000);
  };

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message.trim(), "text");
      setMessage("");
      setAttachments([]);

      // Clear typing indicator
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setIsTyping(false);
      onTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 border-t border-white/10">
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          {attachments.map((file, index) => (
            <div key={index} className="relative flex-shrink-0">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Attachment"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center">
                  <Paperclip size={20} className="text-gray-400" />
                </div>
              )}
              <button
                onClick={() => removeAttachment(index)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center border border-white/10"
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2">
        <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 focus-within:border-purple-500 transition-colors">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-20 left-4">
              <EmojiPicker
                onSelect={handleEmojiSelect}
                onClose={() => setShowEmojiPicker(false)}
              />
            </div>
          )}

          {/* Input */}
          <textarea
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Message..."
            rows="1"
            className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none max-h-32"
            style={{ minHeight: "44px" }}
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-1 px-2 pb-2">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors"
            >
              <Smile size={18} className="text-gray-400" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors"
            >
              <Image size={18} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
              <Paperclip size={18} className="text-gray-400" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={(!message.trim() && attachments.length === 0) || sending}
          className={`p-3 rounded-xl transition-all ${
            message.trim() || attachments.length > 0
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25"
              : "bg-white/5 text-gray-500 cursor-not-allowed"
          }`}
        >
          {sending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
