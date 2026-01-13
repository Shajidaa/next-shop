"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to get profile data
  const fetchProfile = async (token) => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = await res.json();
      return profileData?.data || profileData;
    } catch (err) {
      return null;
    }
  };

  // Centralized function to handle setting user and storage
  const handleAuthSuccess = async (token, permissions) => {
    const profile = await fetchProfile(token);
    const fullUser = {
      ...(profile || {}),
      permissions: permissions || [],
      token,
    };
    setUser(fullUser);
    localStorage.setItem("user", JSON.stringify(fullUser));
    return fullUser;
  };

  const login = async (credentials) => {
    try {
      const res = await axios.post("/api/auth/login", credentials);
      const data = res.data?.data || res.data;
      await handleAuthSuccess(data.token, data.permissions);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post("/api/auth/register", formData);
      const data = res.data?.data || res.data;

      if (data.token) {
        await handleAuthSuccess(data.token, data.permissions);
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Registration failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
