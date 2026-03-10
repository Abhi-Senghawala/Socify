import React from "react";
import Layout from "../../components/layout/Layout";
import { ThemeProvider } from "../../context/ThemeContext";
import { useSettings } from "../../hooks/useSettings";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import ProfileSettings from "../../components/Settings/ProfileSettings";
import AccountSettings from "../../components/Settings/AccountSettings";
import PrivacySettings from "../../components/Settings/PrivacySettings";
import NotificationSettings from "../../components/Settings/NotificationSettings";
import AppearanceSettings from "../../components/Settings/AppearanceSettings";
import SecuritySettings from "../../components/Settings/SecuritySettings";
import HelpSettings from "../../components/Settings/HelpSettings";

const SettingsContent = () => {
  const {
    activeSection,
    setActiveSection,
    profile,
    account,
    privacy,
    notifications,
    security,
    loading,
    success,
    error,
    updateProfile,
    updateAccount,
    updatePrivacy,
    updateNotification,
    updateSecurity,
    saveSettings,
    removeBlockedUser,
    logoutAllDevices,
    deactivateAccount,
  } = useSettings();

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <ProfileSettings
            profile={profile}
            onUpdate={updateProfile}
            onSave={() => saveSettings("profile", profile)}
            loading={loading}
            success={success}
            error={error}
          />
        );

      case "account":
        return (
          <AccountSettings
            account={account}
            onUpdate={updateAccount}
            onSave={() => saveSettings("account", account)}
            onLogoutAll={logoutAllDevices}
            onDeactivate={deactivateAccount}
            loading={loading}
            success={success}
            error={error}
          />
        );

      case "privacy":
        return (
          <PrivacySettings
            privacy={privacy}
            onUpdate={updatePrivacy}
            onSave={() => saveSettings("privacy", privacy)}
            onRemoveBlocked={removeBlockedUser}
            loading={loading}
            success={success}
            error={error}
          />
        );

      case "notifications":
        return (
          <NotificationSettings
            notifications={notifications}
            onUpdate={updateNotification}
            onSave={() => saveSettings("notifications", notifications)}
            loading={loading}
            success={success}
            error={error}
          />
        );

      case "appearance":
        return (
          <AppearanceSettings
            onSave={saveSettings}
            loading={loading}
            success={success}
            error={error}
          />
        );

      case "security":
        return (
          <SecuritySettings
            security={security}
            onUpdate={updateSecurity}
            onSave={() => saveSettings("security", security)}
            loading={loading}
            success={success}
            error={error}
          />
        );

      case "help":
        return <HelpSettings />;

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <SettingsSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
          <div className="flex-1">{renderSection()}</div>
        </div>
      </div>
    </Layout>
  );
};

const Settings = () => {
  return (
    <ThemeProvider>
      <SettingsContent />
    </ThemeProvider>
  );
};

export default Settings;
