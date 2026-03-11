import React from "react";
import { Calendar, Clock, X } from "lucide-react";

const SchedulePost = ({
  showSchedule,
  setShowSchedule,
  scheduleTime,
  setScheduleTime,
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);

  const formatDateForInput = (date) => {
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">Schedule</h3>
        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
            showSchedule
              ? "bg-purple-500 text-white"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          {showSchedule ? "Scheduled" : "Schedule for later"}
        </button>
      </div>

      {showSchedule && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <input
              type="datetime-local"
              value={
                scheduleTime
                  ? formatDateForInput(scheduleTime)
                  : formatDateForInput(tomorrow)
              }
              onChange={(e) => setScheduleTime(new Date(e.target.value))}
              min={formatDateForInput(new Date())}
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <p className="text-xs text-gray-400">
            Your post will be published automatically at the scheduled time.
          </p>
        </div>
      )}
    </div>
  );
};

export default SchedulePost;
