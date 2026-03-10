import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Palette, Monitor } from "lucide-react";
import SettingsCard from "./SettingsCard";

const AppearanceSettings = ({ onSave, loading }) => {
  const { theme, accentColor, setThemeMode, setAccent } = useTheme();
  const [localTheme, setLocalTheme] = useState(theme);
  const [localAccent, setLocalAccent] = useState(accentColor);

  const themes = [
    {
      id: "dark",
      name: "Dark",
      icon: Moon,
      description: "Easy on the eyes at night",
    },
    { id: "light", name: "Light", icon: Sun, description: "Bright and clean" },
    {
      id: "system",
      name: "System",
      icon: Monitor,
      description: "Follow system preference",
    },
  ];

  const accentColors = [
    { id: "purple", name: "Purple", primary: "#8b5cf6", secondary: "#ec4899" },
    { id: "blue", name: "Blue", primary: "#3b82f6", secondary: "#06b6d4" },
    { id: "green", name: "Green", primary: "#10b981", secondary: "#34d399" },
    { id: "orange", name: "Orange", primary: "#f97316", secondary: "#f43f5e" },
    { id: "red", name: "Red", primary: "#ef4444", secondary: "#f87171" },
  ];

  const handleThemeChange = (themeId) => {
    setLocalTheme(themeId);
    setThemeMode(
      themeId === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : themeId,
    );
  };

  const handleAccentChange = (colorId) => {
    setLocalAccent(colorId);
    setAccent(colorId);
  };

  const handleSave = () => {
    onSave("appearance", { theme: localTheme, accent: localAccent });
  };

  return (
    <SettingsCard
      title="Appearance"
      description="Customize how Socify looks on your device"
      onSave={handleSave}
      loading={loading}
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Palette size={18} className="text-purple-400" />
            Theme Mode
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((t) => {
              const Icon = t.icon;
              const isSelected = localTheme === t.id;

              return (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                        isSelected ? "bg-purple-500" : "bg-white/10"
                      }`}
                    >
                      <Icon
                        size={24}
                        className={isSelected ? "text-white" : "text-gray-400"}
                      />
                    </div>
                    <h4 className="text-white font-medium mb-1">{t.name}</h4>
                    <p className="text-xs text-gray-400">{t.description}</p>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Accent Color</h3>

          <div className="flex flex-wrap gap-3">
            {accentColors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleAccentChange(color.id)}
                className={`relative w-14 h-14 rounded-xl transition-all ${
                  localAccent === color.id
                    ? "ring-2 ring-offset-2 ring-offset-gray-900 ring-purple-500 scale-110"
                    : ""
                }`}
                style={{
                  background: `linear-gradient(135deg, ${color.primary} 0%, ${color.secondary} 100%)`,
                }}
              >
                {localAccent === color.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5">
            <h4 className="text-white text-sm font-medium mb-3">
              Live Preview
            </h4>

            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg text-white text-sm transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${accentColors.find((c) => c.id === localAccent)?.primary} 0%, ${accentColors.find((c) => c.id === localAccent)?.secondary} 100%)`,
                  }}
                >
                  Primary Button
                </button>
                <button className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-sm hover:bg-white/5 transition-all">
                  Secondary
                </button>
              </div>

              <p className="text-sm">
                <span className="text-gray-400">This is a </span>
                <span
                  style={{
                    color: accentColors.find((c) => c.id === localAccent)
                      ?.primary,
                  }}
                  className="font-medium"
                >
                  colored link
                </span>
                <span className="text-gray-400"> in action.</span>
              </p>

              <div className="flex gap-2">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    background: `${accentColors.find((c) => c.id === localAccent)?.primary}20`,
                    color: accentColors.find((c) => c.id === localAccent)
                      ?.primary,
                  }}
                >
                  #trending
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white font-semibold mb-4">Text Size</h3>

          <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors">
            <option value="sm">Small</option>
            <option value="md" selected>
              Medium (Default)
            </option>
            <option value="lg">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </div>

        {localTheme === "dark" && (
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-white font-semibold mb-4">
              Dark Mode Settings
            </h3>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300 text-sm">Reduce brightness</span>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 rounded-full peer-checked:bg-purple-500 transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </div>
            </label>
          </div>
        )}
      </div>
    </SettingsCard>
  );
};

export default AppearanceSettings;
