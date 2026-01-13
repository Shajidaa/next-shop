import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'light', // ডিফল্ট থিম
      _hasHydrated: false,

      // Set hydration status
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },

      // থিম টগল করার ফাংশন
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        get().applyTheme(newTheme);
      },

      setLightTheme: () => {
        set({ theme: 'light' });
        get().applyTheme('light');
      },

      setDarkTheme: () => {
        set({ theme: 'dark' });
        get().applyTheme('dark');
      },

      // HTML এর class পরিবর্তন করার ফাংশন
      applyTheme: (theme) => {
        if (typeof window !== 'undefined') {
          const root = document.documentElement;
          if (theme === 'dark') {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      },
    }),
    {
      name: 'theme-storage', // localStorage কী
      onRehydrateStorage: () => (state) => {
        // Apply theme immediately after hydration
        if (state) {
          state.applyTheme(state.theme);
          state.setHasHydrated(true);
        }
      },
    }
  )
);

export default useThemeStore;