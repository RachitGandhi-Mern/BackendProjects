// src/components/Navbar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, BookOpen, Menu, X } from "lucide-react";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Entry Form", href: "/entryform" },
    { name: "Community", href: "/Community" },
    { name: "Profile", href: "/Profile" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-lg border-b shadow-lg
        ${darkMode
          ? "border-gray-800/40 bg-gradient-to-r from-black/70 via-black/50 to-black/70"
          : "border-gray-300/40 bg-gradient-to-r from-white/80 via-gray-100/70 to-white/80"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <BookOpen className={darkMode ? "text-indigo-400" : "text-indigo-600"} size={22} />
          <span className={`font-semibold text-lg ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
            DevTrail
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              className={`transition-colors ${
                darkMode
                  ? "text-gray-300 hover:text-indigo-400"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-lg hover:brightness-110
              ${darkMode
                ? "border-gray-700/50 bg-gradient-to-tr from-gray-900/80 to-gray-800/60 text-gray-300"
                : "border-gray-300/50 bg-gradient-to-tr from-gray-200/80 to-gray-100/60 text-gray-800"
              }`}
          >
            {darkMode
              ? <Sun size={18} className="text-yellow-400" />
              : <Moon size={18} className="text-indigo-500" />
            }
            <span>{darkMode ? "Light" : "Dark"}</span>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg border border-gray-600/40 bg-gray-900/50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="text-gray-300" size={20} /> : <Menu className="text-gray-300" size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden px-6 py-4 border-t
              ${darkMode
                ? "border-gray-800 bg-black/80 text-gray-300"
                : "border-gray-300 bg-white/80 text-gray-700"
              }`}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-indigo-400 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;