import React from "react";
import { VolumeX } from "lucide-react";

const ReelSoundIndicator = ({ muted }) => {
  if (!muted) return null;

  return (
    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
      <VolumeX size={20} className="text-white" />
    </div>
  );
};

export default ReelSoundIndicator;
