import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  PictureInPicture,
} from "lucide-react";
import ReelProgressBar from "./ReelProgressBar";
import ReelSoundIndicator from "./ReelSoundIndicator";

const ReelPlayer = ({
  reel,
  isActive,
  videoRef,
  muted,
  volume,
  onToggleMute,
  onVolumeChange,
  isPiPSupported,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current
          .play()
          .catch((e) => console.log("Playback failed:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, videoRef]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handleCanPlay = () => {
    setIsBuffering(false);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = (x / width) * 100;

    if (videoRef.current) {
      const newTime = (percentage / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(percentage);
    }
  };

  const togglePictureInPicture = async () => {
    if (videoRef.current) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoRef.current.requestPictureInPicture();
        }
      } catch (error) {
        console.log("PiP failed:", error);
      }
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="relative w-full h-full bg-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.thumbnail}
        loop
        playsInline
        muted={muted}
        volume={volume}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={handleWaiting}
        onCanPlay={handleCanPlay}
        className="w-full h-full object-cover"
      />

      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!isPlaying && !isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Play size={32} className="text-white ml-1" />
          </div>
        </div>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <ReelProgressBar
          progress={progress}
          duration={duration}
          currentTime={currentTime}
          onProgressClick={handleProgressClick}
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayPause}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white" />
              )}
            </button>

            <button
              onClick={onToggleMute}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors relative group"
            >
              {muted ? (
                <VolumeX size={20} className="text-white" />
              ) : (
                <Volume2 size={20} className="text-white" />
              )}

              <div className="absolute bottom-full left-0 mb-2 w-24 bg-gray-900 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={onVolumeChange}
                  className="w-full accent-purple-500"
                />
              </div>
            </button>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isPiPSupported && (
              <button
                onClick={togglePictureInPicture}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <PictureInPicture size={18} className="text-white" />
              </button>
            )}

            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Maximize size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>


      {muted && <ReelSoundIndicator muted={muted} />}
    </div>
  );
};

export default ReelPlayer;
