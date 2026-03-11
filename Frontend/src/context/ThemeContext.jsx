
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return savedTheme || (systemPrefersDark ? "dark" : "light");
  });

  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem("accentColor") || "purple";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#111827" : "#ffffff");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("accentColor", accentColor);
    const root = document.documentElement;
    const colors = {
      purple: {
        primary: "#8b5cf6",
        secondary: "#ec4899",
        gradient: "from-purple-500 to-pink-500",
      },
      blue: {
        primary: "#3b82f6",
        secondary: "#06b6d4",
        gradient: "from-blue-500 to-cyan-500",
      },
      green: {
        primary: "#10b981",
        secondary: "#34d399",
        gradient: "from-green-500 to-emerald-500",
      },
      orange: {
        primary: "#f97316",
        secondary: "#f43f5e",
        gradient: "from-orange-500 to-rose-500",
      },
      red: {
        primary: "#ef4444",
        secondary: "#f87171",
        gradient: "from-red-500 to-rose-500",
      },
    };

    const selectedColor = colors[accentColor] || colors.purple;

    root.style.setProperty("--color-primary", selectedColor.primary);
    root.style.setProperty("--color-secondary", selectedColor.secondary);
    root.style.setProperty("--gradient-primary", selectedColor.gradient);
  }, [accentColor]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setThemeMode = (mode) => {
    setTheme(mode);
  };

  const setAccent = (color) => {
    setAccentColor(color);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accentColor,
        toggleTheme,
        setThemeMode,
        setAccent,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
