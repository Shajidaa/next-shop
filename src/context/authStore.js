import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      // Internal helper for API calls
      apiCall: async (endpoint, options = {}) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            'X-Tenant': process.env.NEXT_PUBLIC_TENANT_HEADER,
            ...options.headers,
          },
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || data?.error || 'Something went wrong');
        return data?.data || data;
      },

      fetchProfile: async (token) => {
        try {
          return await get().apiCall('/v2/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (err) {
          return null;
        }
      },

      handleAuthSuccess: async (token, permissions) => {
        const profile = await get().fetchProfile(token);
        const fullUser = {
          ...(profile || {}),
          permissions: permissions || [],
          token,
        };
        set({ user: fullUser });
        return fullUser;
      },

      login: async (credentials) => {
        set({ loading: true });
        try {
          const data = await get().apiCall('/v2/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
          });

          if (data.token) {
            await get().handleAuthSuccess(data.token, data.permissions);
            return { success: true };
          }
          throw new Error("No token received");
        } catch (error) {
          return { success: false, error: error.message };
        } finally {
          set({ loading: false });
        }
      },

      register: async (formData) => {
        set({ loading: true });
        try {
          const data = await get().apiCall('/v2/auth/register', {
            method: 'POST',
            body: JSON.stringify(formData),
          });

          if (data.token) {
            await get().handleAuthSuccess(data.token, data.permissions);
            return { success: true };
          }
          throw new Error("Registration failed");
        } catch (error) {
          return { success: false, error: error.message };
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        set({ user: null });
        if (typeof window !== 'undefined') {
          // localStorage.removeItem("auth-storage"); // Persist middleware handles this usually
          window.location.href = "/";
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), // Explicitly use localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useAuthStore;