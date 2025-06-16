import { ThemesStateParams } from "./types";
import { create } from "zustand";

export const useThemeStore = create<ThemesStateParams>((set) => ({
  isDark: localStorage.getItem("theme-statistic") === "dark",
  toggleTheme: () => {
    set((state) => {
      const newTheme = !state.isDark ? "dark" : "light";
      localStorage.setItem("theme-statistic", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return { isDark: newTheme === "dark" };
    });
  },
}));
