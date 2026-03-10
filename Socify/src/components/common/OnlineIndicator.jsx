// components/common/OnlineIndicator.jsx
import React from "react";

const OnlineIndicator = ({ isOnline, className = "" }) => {
  return (
    <span
      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
        isOnline ? "bg-green-500" : "bg-gray-500"
      } ${className}`}
    />
  );
};

export default OnlineIndicator;
