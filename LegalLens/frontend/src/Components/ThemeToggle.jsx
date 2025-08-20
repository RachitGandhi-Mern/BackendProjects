import React from "react"
import { useTheme } from "../Context/ThemeContext"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 
                 backdrop-blur-md transition-all duration-500 shadow-lg hover:scale-105"
    >
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-500
          ${theme === "dark" ? "bg-white text-black" : "bg-black text-white"}
        `}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </span>

      <span
        className={`font-medium tracking-wide transition-all duration-500
          ${theme === "dark" ? "text-white" : "text-black"}
        `}
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  )
}