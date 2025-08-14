// src/pages/Signup.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, UserPlus } from "lucide-react";
import axios from "axios";

const Signup = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    Fullname: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        "https://backendprojects-9fw1.onrender.com/api/auth/signup",
        formData,
        { withCredentials: true }
      );
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    window.location.href = "/login";
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-[#050406] via-[#07070a] to-[#0b0b0f]"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-100"
      }`}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`w-full max-w-md rounded-2xl backdrop-blur-md border shadow-2xl p-6 transition-colors duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-black/60 via-white/2 to-black/40 border-gray-800/40"
            : "bg-white border-gray-300"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <UserPlus
            size={28}
            className={darkMode ? "text-indigo-400" : "text-indigo-600"}
          />
          <h2
            className={`text-2xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Create New Account
          </h2>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label
            className={`block mb-2 text-sm ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Full Name
          </label>
          <div
            className={`flex items-center gap-2 rounded-lg border p-3 focus-within:ring-2 transition-all ${
              darkMode
                ? "bg-transparent border-gray-800 text-gray-200 focus:ring-indigo-500/25"
                : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500/50"
            }`}
          >
            <User size={16} />
            <input
              type="text"
              name="Fullname"
              placeholder="Enter full name"
              value={formData.Fullname}
              onChange={handleChange}
              required
              className={`w-full bg-transparent outline-none ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            />
          </div>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label
            className={`block mb-2 text-sm ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Username
          </label>
          <div
            className={`flex items-center gap-2 rounded-lg border p-3 focus-within:ring-2 transition-all ${
              darkMode
                ? "bg-transparent border-gray-800 text-gray-200 focus:ring-indigo-500/25"
                : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500/50"
            }`}
          >
            <User size={16} />
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
              className={`w-full bg-transparent outline-none ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            className={`block mb-2 text-sm ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Password
          </label>
          <div
            className={`flex items-center gap-2 rounded-lg border p-3 focus-within:ring-2 transition-all ${
              darkMode
                ? "bg-transparent border-gray-800 text-gray-200 focus:ring-indigo-500/25"
                : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500/50"
            }`}
          >
            <Lock size={16} />
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full bg-transparent outline-none ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            />
          </div>
        </div>

        {/* Signup Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3 bg-gradient-to-tr from-indigo-600 to-pink-600 text-white font-semibold shadow-xl hover:brightness-105 disabled:opacity-60"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            <UserPlus size={16} />
          )}
          <span>{loading ? "Signing up..." : "Signup"}</span>
        </motion.button>

        {/* Messages */}
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              darkMode ? "text-emerald-400" : "text-emerald-700"
            }`}
          >
            {message}
          </p>
        )}
        {error && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              darkMode ? "text-rose-400" : "text-rose-700"
            }`}
          >
            {error}
          </p>
        )}

        <div className="relative my-4">
          <div
            className={`absolute inset-0 flex items-center ${
              darkMode ? "opacity-20" : "opacity-100"
            }`}
          >
            <div
              className={`w-full border-t ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            />
          </div>
          <div className="relative flex justify-center text-xs">
            <span
              className={`px-2 ${
                darkMode
                  ? "bg-gradient-to-br from-black/60 via-white/2 to-black/40 text-gray-400"
                  : "bg-white text-gray-500"
              }`}
            >
              OR
            </span>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={handleSignupRedirect}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3 border font-semibold transition-all duration-200 ${
            darkMode
              ? "border-gray-700 text-gray-300 hover:bg-gray-800/30 hover:border-gray-600"
              : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
          }`}
        >
          <UserPlus size={16} />
          <span>Login To Your Account</span>
        </motion.button>

        {/* Signup Text Link */}
        <div className="text-center mt-4">
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleSignupRedirect}
              className={`font-medium hover:underline transition-colors ${
                darkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-700"
              }`}
            >
              Login up here
            </button>
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default Signup;
