import React from "react"
import useTheme from "../utils/theme"

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button onClick={toggle} className="px-3 py-1 border rounded">
      {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
    </button>
  )
}