"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (token) => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profileData = await res.json();
      return profileData;
    } catch (err) {
      console.error("Profile fetch error:", err);
      return null;
    }
  };

  const login = async (credentials) => {
    try {
      const res = await axios.post("/api/auth/login", credentials);
      const { token, permissions } = res.data.data;

      const profile = await fetchProfile(token);

      const fullUser = {
        ...profile,
        permissions,
        token,
      };

      setUser(fullUser);
      localStorage.setItem("user", JSON.stringify(fullUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  };
  const logout = async () => {
    try {
      if (user?.token) {
        await axios.post(
          "/api/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Server-side logout failed:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
