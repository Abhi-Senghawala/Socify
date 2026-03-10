import React, { useState } from "react";
import {
  Shield,
  Key,
  History,
  Smartphone,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";
import SettingsCard from "./SettingsCard";

const SecuritySettings = ({
  security,
  onUpdate,
  onSave,
  loading,
  success,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showLoginHistory, setShowLoginHistory] = useState(false);
  const [showConnectedApps, setShowConnectedApps] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = () => {
    // Implement password change logic
    console.log("Change password:", passwordData);
  };

  const getStatusIcon = (status) => {
    return status === "success" ? (
      <CheckCircle size={14} className="text-green-400" />
    ) : (
      <XCircle size={14} className="text-red-400" />
    );
  };

  return (
    <SettingsCard
      title="Security Settings"
      description="Protect your account and manage security preferences"
      onSave={onSave}
      loading={loading}
      success={success}
      error={error}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Key size={18} className="text-purple-400" />
            <h3 className="text-white font-semibold">Password</h3>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-300 mb-2">
              Password last changed: {security.passwordLastChanged}
            </p>

            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-purple-400 hover:underline"
            >
              Change Password
            </button>

            {showPassword && (
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="current"
                      value={passwordData.current}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 pr-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="new"
                      value={passwordData.new}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 pr-10"
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showNewPassword ? (
                        <EyeOff size={16} className="text-gray-400" />
                      ) : (
                        <Eye size={16} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm"
                      value={passwordData.confirm}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 pr-10"
                    />
                    <button
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} className="text-gray-400" />
                      ) : (
                        <Eye size={16} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleChangePassword}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  Update Password
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-purple-400" />
              <div>
                <h3 className="text-white font-semibold">
                  Two-Factor Authentication
                </h3>
                <p className="text-xs text-gray-400">
                  {security.emailVerified
                    ? "Email verified"
                    : "Email not verified"}{" "}
                  •
                  {security.phoneVerified
                    ? " Phone verified"
                    : " Phone not verified"}
                </p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
              Enabled
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button
            onClick={() => setShowLoginHistory(!showLoginHistory)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <History size={18} className="text-purple-400" />
              <div className="text-left">
                <h3 className="text-white font-semibold">Login History</h3>
                <p className="text-xs text-gray-400">Recent login activity</p>
              </div>
            </div>
            <span className="text-sm text-gray-400">
              {security.loginHistory?.length} events
            </span>
          </button>

          {showLoginHistory && (
            <div className="mt-4 space-y-3">
              {security.loginHistory?.map((login) => (
                <div
                  key={login.id}
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-xl"
                >
                  {getStatusIcon(login.status)}
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {login.device}
                    </p>
                    <p className="text-xs text-gray-400">
                      {login.location} • {login.ip} • {login.time}
                    </p>
                  </div>
                  {login.status === "failed" && (
                    <AlertTriangle size={14} className="text-yellow-400" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-white/10">
          <button
            onClick={() => setShowConnectedApps(!showConnectedApps)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-purple-400" />
              <div className="text-left">
                <h3 className="text-white font-semibold">Connected Apps</h3>
                <p className="text-xs text-gray-400">
                  Apps with access to your account
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-400">
              {security.connectedApps?.length} apps
            </span>
          </button>

          {showConnectedApps && (
            <div className="mt-4 space-y-3">
              {security.connectedApps?.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {app.name}
                      </p>
                      {app.connected && (
                        <p className="text-xs text-gray-400">
                          Access: {app.permissions?.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>

                  {app.connected ? (
                    <button className="text-xs text-red-400 hover:text-red-300">
                      Revoke
                    </button>
                  ) : (
                    <button className="text-xs text-purple-400 hover:text-purple-300">
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone size={18} className="text-purple-400" />
            <h3 className="text-white font-semibold">Where You're Logged In</h3>
          </div>

          <div className="space-y-3">
            {security.activeSessions?.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Smartphone size={16} className="text-gray-400" />
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
                  <button className="text-xs text-red-400 hover:text-red-300">
                    Logout
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SettingsCard>
  );
};

export default SecuritySettings;
