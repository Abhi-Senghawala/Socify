import React from "react";

const ReelSkeleton = () => {
  return (
    <div className="w-full h-full bg-gray-900 animate-pulse">
      <div className="w-full h-full bg-gray-800"></div>

      <div className="absolute top-0 left-0 right-0 p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="flex-1">
            <div className="w-32 h-4 bg-gray-700 rounded mb-2"></div>
            <div className="w-48 h-3 bg-gray-700 rounded mb-2"></div>
            <div className="w-24 h-3 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      <div className="absolute right-4 bottom-24">
        <div className="flex flex-col items-center gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-3 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReelSkeleton;
