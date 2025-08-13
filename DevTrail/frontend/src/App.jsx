import React, { useState, useEffect } from "react";
import MainRoute from "./Routes/MainRoute";
import Navbar from "./Components/Navbar";

const App = ()=> {
  // Initial dark mode value localStorage se lena
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true"; 
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen transition-colors duration-300`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="pt-20">
        <MainRoute darkMode={darkMode} />
      </div>
    </div>
  );
}
export default App