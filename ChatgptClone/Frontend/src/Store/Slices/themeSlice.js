import { createSlice } from "@reduxjs/toolkit";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const initialState = {
  theme: localStorage.getItem("theme") || getSystemTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);

      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(action.payload);
    },
    syncSystemTheme: (state) => {
      const systemTheme = getSystemTheme();
      state.theme = systemTheme;
      localStorage.setItem("theme", systemTheme);

      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(systemTheme);
    },
  },
});

export const { setTheme, syncSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
