import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();

    const handleUnauthorized = () => {
      console.log("Unauthorized event received");
      setUser(null);
      setAuthenticated(false);
    };

    window.addEventListener("unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      console.log("Checking auth status...");
      const response = await authAPI.checkAuth();
      console.log("Auth check response:", response.data);

      if (response.data.success) {
        setUser(response.data.user);
        setAuthenticated(true);
        console.log("User authenticated:", response.data.user);
      }
    } catch (error) {
      console.log(
        "Not authenticated:",
        error.response?.data?.message || error.message,
      );
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log("Login attempt for:", email);
      const response = await authAPI.login({ email, password });
      console.log("Login response:", response.data);

      if (response.data.success) {
        setUser(response.data.user);
        setAuthenticated(true);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log("Register attempt for:", userData.email);
      const response = await authAPI.register(userData);
      console.log("Register response:", response.data);

      if (response.data.success) {
        setUser(response.data.user);
        setAuthenticated(true);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error("Register error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = async () => {
    try {
      console.log("Logout attempt");
      const response = await authAPI.logout();
      console.log("Logout response:", response.data);

      setUser(null);
      setAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false };
    }
  };

  const value = {
    user,
    loading,
    authenticated,
    login,
    register,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
