import React, { useState } from "react";
import {
  Eye,
  Users,
  MessageCircle,
  Camera,
  X,
  AlertCircle,
  Check
} from "lucide-react";
import SettingsCard from "./SettingsCard";

const PrivacySettings = ({
  privacy,
  onUpdate,
  onSave,
  onRemoveBlocked,
  loading,
  success,
  error,
}) => {
  const [showBlockList, setShowBlockList] = useState(false);
  const [showRestrictedList, setShowRestrictedList] = useState(false);

  const handleSelectChange = (field, value) => {
    onUpdate(field, value);
  };

  const handleToggleChange = (field) => {
    onUpdate(field, !privacy[field]);
  };

  const privacyOptions = [
    { value: "everyone", label: "Everyone" },
    { value: "followers", label: "Followers Only" },
    { value: "nobody", label: "Nobody" },
    { value: "mutual", label: "Mutual Followers" },
  ];

  return (
    <SettingsCard
      title="Privacy Settings"
      description="Control who can see your content and interact with you"
      onSave={onSave}
      loading={loading}
      success={success}
      error={error}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-white font-semibold mb-3">Profile Visibility</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => onUpdate("profileVisibility", "public")}
              className={`p-4 rounded-xl border-2 transition-all ${
                privacy.profileVisibility === "public"
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Eye
                  size={20}
                  className={
                    privacy.profileVisibility === "public"
                      ? "text-purple-400"
                      : "text-gray-400"
                  }
                />
                <span className="text-white font-medium">Public</span>
                {privacy.profileVisibility === "public" && (
                  <Check size={16} className="text-purple-400 ml-auto" />
                )}
              </div>
              <p className="text-xs text-gray-400 text-left">
                Anyone can see your profile
              </p>
            </button>

            <button
              onClick={() => onUpdate("profileVisibility", "private")}
              className={`p-4 rounded-xl border-2 transition-all ${
                privacy.profileVisibility === "private"
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Users
                  size={20}
                  className={
                    privacy.profileVisibility === "private"
                      ? "text-purple-400"
                      : "text-gray-400"
                  }
                />
                <span className="text-white font-medium">Private</span>
                {privacy.profileVisibility === "private" && (
                  <Check size={16} className="text-purple-400 ml-auto" />
                )}
              </div>
              <p className="text-xs text-gray-400 text-left">
                Only followers can see your posts
              </p>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">Activity Status</h3>
              <p className="text-sm text-gray-400 mt-1">
                Show when you're active to your followers
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.activityStatus}
                onChange={() => handleToggleChange("activityStatus")}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors ${
                  privacy.activityStatus ? "bg-purple-500" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    privacy.activityStatus ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">Show Likes</h3>
              <p className="text-sm text-gray-400 mt-1">
                Hide like counts on your posts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.showLikes}
                onChange={() => handleToggleChange("showLikes")}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors ${
                  privacy.showLikes ? "bg-purple-500" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    privacy.showLikes ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white font-semibold mb-3">Tagged Posts</h3>
          <select
            value={privacy.taggedPosts}
            onChange={(e) => handleSelectChange("taggedPosts", e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
          >
            {privacyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-2">
            Control who can see posts you're tagged in
          </p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white font-semibold mb-3">Direct Messages</h3>
          <select
            value={privacy.directMessages}
            onChange={(e) =>
              handleSelectChange("directMessages", e.target.value)
            }
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
          >
            {privacyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-2">
            Who can send you direct messages
          </p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white font-semibold mb-3">Story Visibility</h3>
          <select
            value={privacy.storyVisibility}
            onChange={(e) =>
              handleSelectChange("storyVisibility", e.target.value)
            }
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
          >
            {privacyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button
            onClick={() => setShowBlockList(!showBlockList)}
            className="w-full flex items-center justify-between"
          >
            <div className="text-left">
              <h3 className="text-white font-semibold">Blocked Users</h3>
              <p className="text-sm text-gray-400 mt-1">
                {privacy.blockList?.length || 0} users blocked
              </p>
            </div>
            <AlertCircle size={20} className="text-gray-400" />
          </button>

          {showBlockList && (
            <div className="mt-4 space-y-3">
              {privacy.blockList?.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400">@{user.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveBlocked(user.id)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                </div>
              ))}

              {privacy.blockList?.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                  No blocked users
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </SettingsCard>
  );
};

export default PrivacySettings;
