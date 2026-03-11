import React from "react";

const NotificationSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-start gap-4 p-4 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-white/5"></div>

          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5"></div>

              <div className="flex-1">
                <div className="h-4 bg-white/5 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-white/5 rounded w-1/4"></div>
              </div>
            </div>
          </div>

          <div className="w-12 h-12 rounded-lg bg-white/5"></div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
