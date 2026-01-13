import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,

      
      fetchProfile: async (token) => {
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
      },

      // লগইন বা রেজিস্ট্রেশন 
      handleAuthSuccess: async (token, permissions) => {
        const profile = await get().fetchProfile(token); // get() দিয়ে স্টোরের অন্য ফাংশন কল করা যায়
        const fullUser = {
          ...(profile || {}),
          permissions: permissions || [],
          token,
        };
        set({ user: fullUser });
        return fullUser;
      },

      // লগইন ফাংশন
      login: async (credentials) => {
        set({ loading: true });
        try {
          const res = await axios.post("/api/auth/login", credentials);
          const data = res.data?.data || res.data;
          
         
          
          if (data.token) {
            await get().handleAuthSuccess(data.token, data.permissions);
            set({ loading: false });
            return { success: true };
          } else {
            set({ loading: false });
            return { success: false, error: "No token received" };
          }
        } catch (error) {
         
          set({ loading: false });
          return {
            success: false,
            error: error.response?.data?.message || error.response?.data?.error || "Login failed",
          };
        }
      },

      // রেজিস্ট্রেশন ফাংশন
      register: async (formData) => {
        set({ loading: true });
        try {
          const res = await axios.post("/api/auth/register", formData);
          const data = res.data?.data || res.data;

          
          if (data.token) {
            await get().handleAuthSuccess(data.token, data.permissions);
          }
          set({ loading: false });
          return { success: true };
        } catch (error) {
         
          set({ loading: false });
          return {
            success: false,
            error: error.response?.data?.message || error.response?.data?.error || "Registration failed",
          };
        }
      },

      // লগআউট ফাংশন
      logout: () => {
        set({ user: null });
        // Check if we're in the browser before accessing localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem("auth-storage"); 
          window.location.href = "/";
        }
      },
    }),
    {
      name: 'auth-storage', 
    }
  )
);

export default useAuthStore;
