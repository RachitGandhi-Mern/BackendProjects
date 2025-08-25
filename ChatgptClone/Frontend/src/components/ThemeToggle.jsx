import React, { useEffect, useState } from "react";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || getSystemTheme();
  });

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const listener = () => {
      if (!localStorage.getItem("theme")) {
        setTheme(getSystemTheme());
      }
    };
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);
    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listener);
    };
  }, []);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative w-36 h-11 flex items-center justify-center rounded-full
                 bg-gradient-to-r from-gray-100 to-white dark:from-[#0000] dark:to-[#0000]
                 text-gray-900 dark:text-gray-100 font-medium text-sm tracking-wide
                 border border-gray-300/60 dark:border-gray-700/80
                 shadow-md hover:shadow-lg transition-all duration-500
                 overflow-hidden"
    >
      {/* Sliding background highlight */}
      <span
        className={`absolute inset-0 rounded-full transition-transform duration-500 ease-out
        ${theme === "dark" ? "translate-x-0  bg-gradient-to-r from-black to-[#243b55]" : "translate-x-full bg-gradient-to-r  from-[#dfe9f3] to-[#ffffff]"}`}
      ></span>

      {/* Text (stays above bg highlight) */}
      <span className="relative z-10 transition-all duration-500">
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
}
