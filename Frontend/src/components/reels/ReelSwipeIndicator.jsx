import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const ReelSwipeIndicator = ({ show }) => {
  if (!show) return null;

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 top-4 flex flex-col items-center animate-bounce">
      <ChevronUp size={24} className="text-white/60" />
      <span className="text-xs text-white/60 mt-1">Swipe up for next</span>
    </div>
  );
};

export default ReelSwipeIndicator;
