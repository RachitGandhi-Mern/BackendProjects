// src/pages/Login.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Lock, User, LogIn, UserPlus } from "lucide-react";
import API from "../../api/apiconfig";

const Login = ({ darkMode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/Community";
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    window.location.href = "/signup";
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-[#050406] via-[#07070a] to-[#0b0b0f]"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-100"
      }`}
    >
      {success && <Confetti numberOfPieces={250} recycle={false} />}

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`relative w-full max-w-md rounded-2xl backdrop-blur-md border shadow-2xl p-6 transition-colors duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-black/60 via-white/2 to-black/40 border-gray-800/40"
            : "bg-white border-gray-300"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2
            className={`text-3xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome Back
          </h2>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Login to access your account
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mb-4 p-3 text-sm rounded-lg border ${
              darkMode
                ? "bg-rose-700/10 border-rose-600/20 text-rose-300"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {error}
          </motion.div>
        )}

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
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-transparent outline-none ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            />
          </div>
        </div>

        {/* Login Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3 bg-gradient-to-tr from-indigo-600 to-pink-600 text-white font-semibold shadow-xl hover:brightness-105 disabled:opacity-60 mb-4"
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
            <LogIn size={16} />
          )}
          <span>{loading ? "Logging in..." : "Login"}</span>
        </motion.button>

        {/* Divider */}
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

        {/* Signup Button */}
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
          <span>Create New Account</span>
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
              Sign up here
            </button>
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
