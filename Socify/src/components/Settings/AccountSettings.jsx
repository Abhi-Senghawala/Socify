import React, { useState } from "react";
import {
  Lock,
  Globe,
  Smartphone,
  LogOut,
  AlertTriangle,
  Check,
  X,
  MoreHorizontal,
} from "lucide-react";
import SettingsCard from "./SettingsCard";

const AccountSettings = ({
  account,
  onUpdate,
  onSave,
  onLogoutAll,
  onDeactivate,
  loading,
  success,
  error,
}) => {
  const [showSessions, setShowSessions] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

  const handleToggleChange = (field) => {
    onUpdate(field, !account[field]);
  };

  const handleDeactivate = () => {
    setShowDeactivateConfirm(true);
  };

  const confirmDeactivate = () => {
    onDeactivate();
    setShowDeactivateConfirm(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <SettingsCard
      title="Account Settings"
      description="Manage your account preferences and security"
      onSave={onSave}
      loading={loading}
      success={success}
      error={error}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-white font-semibold mb-3">Account Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => onUpdate("private", false)}
              className={`p-4 rounded-xl border-2 transition-all ${
                !account.private
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Globe
                  size={20}
                  className={
                    !account.private ? "text-purple-400" : "text-gray-400"
                  }
                />
                <span className="text-white font-medium">Public Account</span>
                {!account.private && (
                  <Check size={16} className="text-purple-400 ml-auto" />
                )}
              </div>
              <p className="text-xs text-gray-400 text-left">
                Anyone can see your posts and profile
              </p>
            </button>

            <button
              onClick={() => onUpdate("private", true)}
              className={`p-4 rounded-xl border-2 transition-all ${
                account.private
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Lock
                  size={20}
                  className={
                    account.private ? "text-purple-400" : "text-gray-400"
                  }
                />
                <span className="text-white font-medium">Private Account</span>
                {account.private && (
                  <Check size={16} className="text-purple-400 ml-auto" />
                )}
              </div>
              <p className="text-xs text-gray-400 text-left">
                Only approved followers can see your posts
              </p>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={account.twoFactorAuth}
                onChange={() => handleToggleChange("twoFactorAuth")}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors ${
                  account.twoFactorAuth ? "bg-purple-500" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    account.twoFactorAuth ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>

          {account.twoFactorAuth && (
            <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <p className="text-sm text-purple-400">
                Two-factor authentication is enabled. Your account is more
                secure.
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">Login Notifications</h3>
              <p className="text-sm text-gray-400 mt-1">
                Get notified when someone logs into your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={account.loginNotifications}
                onChange={() => handleToggleChange("loginNotifications")}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors ${
                  account.loginNotifications ? "bg-purple-500" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    account.loginNotifications ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button
            onClick={() => setShowSessions(!showSessions)}
            className="w-full flex items-center justify-between"
          >
            <div className="text-left">
              <h3 className="text-white font-semibold">Active Sessions</h3>
              <p className="text-sm text-gray-400 mt-1">
                Manage devices where you're logged in
              </p>
            </div>
            <MoreHorizontal size={20} className="text-gray-400" />
          </button>

          {showSessions && (
            <div className="mt-4 space-y-3">
              {account.activeSessions?.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone size={18} className="text-gray-400" />
                    <div>
                      <p className="text-white text-sm font-medium">
                        {session.device}
                        {session.current && (
                          <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400">
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <button className="text-red-400 hover:text-red-300 text-sm">
                      Logout
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={onLogoutAll}
                className="w-full mt-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm hover:bg-red-500/20 transition-all"
              >
                Log out of all other devices
              </button>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white font-semibold mb-3">Deactivate Account</h3>
          <p className="text-sm text-gray-400 mb-4">
            This will temporarily disable your account. You can reactivate it
            anytime by logging back in.
          </p>

          {!showDeactivateConfirm ? (
            <button
              onClick={handleDeactivate}
              className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm hover:bg-red-500/20 transition-all"
            >
              Deactivate Account
            </button>
          ) : (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle
                  size={20}
                  className="text-red-400 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-white text-sm font-medium mb-1">
                    Are you sure you want to deactivate?
                  </p>
                  <p className="text-xs text-gray-400">
                    Your profile, posts, and all your data will be hidden until
                    you reactivate.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={confirmDeactivate}
                  className="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-all"
                >
                  Yes, Deactivate
                </button>
                <button
                  onClick={() => setShowDeactivateConfirm(false)}
                  className="flex-1 px-3 py-2 bg-white/5 text-gray-300 text-sm rounded-lg hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white font-semibold mb-3">Download Your Data</h3>
          <p className="text-sm text-gray-400 mb-4">
            Get a copy of your posts, comments, and profile information
          </p>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-all">
            Request Data Download
          </button>
        </div>
      </div>
    </SettingsCard>
  );
};

export default AccountSettings;
