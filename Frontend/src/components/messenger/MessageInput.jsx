import React, { useState, useRef, useEffect } from "react";
import {
  Smile,
  Image,
  Paperclip,
  Mic,
  Send,
  X,
  StopCircle,
} from "lucide-react";

const MessageInput = ({ onSendMessage, onTyping, sending, disabled }) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const recordingTimerRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    onTyping(message.length > 0);

    return () => {
      if (message.length === 0) {
        onTyping(false);
      }
    };
  }, [message, onTyping]);

  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message.trim(), "text");
      setMessage("");
      setAttachments([]);
      onTyping(false);

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setAttachments((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              file,
              preview: event.target.result,
              type: "image",
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    // Here you would handle the recorded audio
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4 border-t border-white/10 bg-gray-900/50">
      {attachments.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          {attachments.map((att) => (
            <div key={att.id} className="relative flex-shrink-0">
              <img
                src={att.preview}
                alt="Attachment"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <button
                onClick={() => removeAttachment(att.id)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-gray-900"
              >
                <X size={10} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 focus-within:border-purple-500 transition-colors">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder={disabled ? "Reconnecting..." : "Message..."}
            disabled={disabled}
            rows="1"
            className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none max-h-32 disabled:opacity-50"
          />

          <div className="flex items-center gap-1 px-2 pb-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors disabled:opacity-50"
            >
              <Image size={18} className="text-gray-400" />
            </button>
            <button
              disabled={disabled}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors disabled:opacity-50"
            >
              <Paperclip size={18} className="text-gray-400" />
            </button>

            {isRecording ? (
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-lg"
              >
                <StopCircle size={16} className="text-red-500 animate-pulse" />
                <span className="text-red-500 text-xs">
                  {formatTime(recordingTime)}
                </span>
              </button>
            ) : (
              <button
                onClick={startRecording}
                disabled={disabled}
                className="p-2 hover:bg-white/5 rounded-xl transition-colors disabled:opacity-50"
              >
                <Mic size={18} className="text-gray-400" />
              </button>
            )}

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

        <button
          onClick={handleSend}
          disabled={
            (!message.trim() && attachments.length === 0) || sending || disabled
          }
          className={`p-3 rounded-xl transition-all ${
            (message.trim() || attachments.length > 0) && !disabled
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
