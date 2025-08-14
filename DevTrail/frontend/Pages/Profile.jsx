import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../src/api/apiconfig";
import { Link, useNavigate } from "react-router-dom";
import ContributionGraph from "../src/Components/ContributionGraph";

const Profile = ({ darkMode }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/api/auth/getUser");
        setUser(res.data);
      } catch (err) {
        setUser(null);
        setError("You need to login first.");
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  const logoutHandler = async () => {
    setLoggingOut(true);
    try {
      await API.get("/api/auth/logout");
      localStorage.removeItem("token")
      setUser(null);
      setError("");
      navigate("/login"); // redirect to login after logout
    } catch (err) {
      setError("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  if (loadingUser)
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700"
        }`}
      >
        Loading profile...
      </div>
    );

  if (!user)
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${
          darkMode
            ? "bg-gradient-to-b from-[#050406] via-[#07070a] to-[#0b0b0f] text-gray-200"
            : "bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`max-w-md rounded-2xl backdrop-blur-md border shadow-2xl p-8 ${
            darkMode
              ? "bg-gradient-to-br from-black/60 via-white/5 to-black/40 border-gray-800/40"
              : "bg-white border-gray-300"
          } text-center`}
        >
          <h2 className="text-2xl font-semibold mb-4">Not Logged In</h2>
          <p className="mb-6">{error || "Please login or signup to view your profile."}</p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-indigo-600 rounded-xl text-white font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 border border-indigo-600 rounded-xl text-indigo-600 font-semibold hover:bg-indigo-100 transition"
            >
              Signup
            </Link>
          </div>
        </motion.div>
      </div>
    );

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-[#050406] via-[#07070a] to-[#0b0b0f] text-gray-200"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
    <div className="mb-20">
        <ContributionGraph darkMode={darkMode} />
    </div>
       

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-md rounded-2xl backdrop-blur-md border shadow-2xl p-8 ${
          darkMode
            ? "bg-gradient-to-br from-black/60 via-white/5 to-black/40 border-gray-800/40"
            : "bg-white border-gray-300"
        }`}
      >
        <h1 className="text-3xl font-semibold mb-6">Your Profile</h1>

        <div className="mb-4">
          <strong>Full Name:</strong> <span>{user?.Fullname}</span>
        </div>
        <div className="mb-4">
          <strong>Username:</strong> <span>{user?.username}</span>
        </div>
        <div className="mb-4">
          <strong>User ID:</strong> <span>{user?._id}</span>
        </div>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <button
          onClick={logoutHandler}
          disabled={loggingOut}
          className="mt-4 px-6 py-3 bg-red-600 rounded-xl text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;