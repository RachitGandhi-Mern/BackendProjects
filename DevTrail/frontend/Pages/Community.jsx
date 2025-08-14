import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Eye, Tag, User } from "lucide-react";
import API from "../src/api/apiconfig";

const Community = ({ darkMode }) => {
  const [entries, setEntries] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const entruhandler = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await API.get("/api/entries/getenrites");

      // Filter only public entries
      const publicEntries = (response.data.data || []).filter(
        (entry) => entry.isPublic
      );

      setEntries(publicEntries);
      setCount(publicEntries.length);
      setMessage(`Loaded ${publicEntries.length} public entries ✅`);
    } catch (err) {
      setError("Failed to fetch entries ❌");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on first render
  useEffect(() => {
    entruhandler();
  }, []);

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-[#050406] via-[#07070a] to-[#0b0b0f]"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className={`text-2xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Public Learnings{" "}
            <span className="text-sm font-normal text-gray-500">({count})</span>
          </h1>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            See what others have learned and shared.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={entruhandler}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-600 text-white shadow-lg disabled:opacity-60"
        >
          {loading ? (
            <RefreshCw className="animate-spin" size={16} />
          ) : (
            <RefreshCw size={16} />
          )}
          <span>{loading ? "Loading..." : "Refresh"}</span>
        </motion.button>
      </div>

      {/* Messages */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm border shadow-sm ${
            darkMode
              ? "bg-emerald-700/10 border-emerald-600/20 text-emerald-200"
              : "bg-emerald-50 border-emerald-200 text-emerald-800"
          }`}
        >
          {message}
        </div>
      )}
      {error && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm border shadow-sm ${
            darkMode
              ? "bg-rose-700/10 border-rose-600/20 text-rose-200"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {error}
        </div>
      )}

      {/* Entries List */}
      <div className="grid gap-4 md:grid-cols-2">
        {entries.length > 0 ? (
          entries.map((entry, idx) => (
            <motion.div
              key={entry._id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`rounded-xl border p-4 shadow-sm ${
                darkMode
                  ? "bg-gradient-to-b from-white/3 to-black/30 border-gray-800/40 text-gray-100"
                  : "bg-white border-gray-200 text-gray-900"
              }`}
            >
              {/* User Info */}
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                <User size={14} />
                <span>{entry.displayname || "Unknown User"}</span>
              </div>

              {/* Public Badge */}
              <div className="flex items-center gap-2 mb-2 text-xs px-2 py-1 rounded-full border bg-green-50 border-green-200 text-green-700 dark:bg-green-700/10 dark:border-green-600/20 dark:text-green-300">
                <Eye size={12} /> Public
              </div>

              {/* Content */}
              <p className="text-sm whitespace-pre-wrap leading-relaxed mb-3">
                {entry.content}
              </p>

              {/* AI Description */}
              {entry.disc && (
                <div
                  className={`mt-3 p-3 rounded-lg border text-sm italic ${
                    darkMode
                      ? "bg-gradient-to-r from-indigo-900/10 to-pink-900/10 border-indigo-700/20 text-indigo-200"
                      : "bg-indigo-50 border-indigo-200 text-indigo-700"
                  }`}
                >
                  {entry.disc}
                </div>
              )}

              {/* Tags */}
              {entry.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {entry.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs border ${
                        darkMode
                          ? "bg-gradient-to-r from-indigo-700/20 via-violet-700/20 to-pink-700/20 text-indigo-200 border-indigo-600/20"
                          : "bg-indigo-50 text-indigo-700 border-indigo-200"
                      }`}
                    >
                      <Tag size={12} /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <p
            className={`text-center col-span-full ${
              darkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            No public entries yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Community;
