import { useEffect, useState } from "react"

export const useTheme = () => {
  const [theme, setThemeState] = useState(() => localStorage.getItem("theme") || "dark")

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const applyTheme = (t) => {
    const root = document.documentElement
    if (t === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
    localStorage.setItem("theme", t)
  }

  const setTheme = (t) => {
    setThemeState(t)
  }

  const toggle = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return { theme, setTheme, toggle }
}
export default useTheme