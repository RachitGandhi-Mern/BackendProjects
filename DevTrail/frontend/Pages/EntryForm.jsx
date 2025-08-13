import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, Tag, Eye, Lock } from "lucide-react";
import API from "../src/api/apiconfig";

const EntryForm = ({ darkMode }) => {
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDesc, setLoadingDesc] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [aiDescription, setAiDescription] = useState("");
  const [myEntries, setMyEntries] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const parsedTags = tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await API.get("/api/auth/getUser");
        const userDisplayName =
          response.data.Fullname || response.data.username || "";
        setName(userDisplayName);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setName("");
      }
    };

    fetchUserName();
    fetchMyEntries(); // ✅ Load entries on mount
  }, []);

  const fetchMyEntries = async () => {
    try {
      const res = await API.get("/api/entries/my");
      setMyEntries(res.data);
    } catch (err) {
      console.error("Error fetching my entries", err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await API.post("/api/entries", {
        displayname: name,
        content,
        isPublic,
        disc: aiDescription,
        tags: parsedTags,
      });

      setToastType("success");
      setMessage(response.data.message || "Entry uploaded successfully ✅");

      // Reset form
      setContent("");
      setIsPublic(true); 
      setTags("");
      setAiDescription("");

      fetchMyEntries();
    } catch (err) {
      setToastType("error");
      setMessage(err.response?.data?.message || "Error uploading entry ❌");
    } finally {
      setShowToast(true);
      setLoading(false);
      setTimeout(() => setShowToast(false), 3600);
    }
  };

  const generateDescription = async () => {
    if (!content.trim()) return alert("Please write content first!");
    setLoadingDesc(true);
    try {
      const res = await API.post("/api/entries/generate-description", {
        content,
      });
      setAiDescription(res.data.description);
    } catch (err) {
      console.error(err);
      alert("Failed to generate description.");
    } finally {
      setLoadingDesc(false);
    }
  };

  const deleteEntry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    setDeletingId(id);
    try {
      await API.delete(`/api/entries/${id}`);
      setMyEntries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert("Failed to delete entry");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-[#050406] via-[#07070a] to-[#0b0b0f]"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* FORM */}
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`w-full max-w-2xl rounded-2xl backdrop-blur-md border shadow-2xl p-6 transition-colors duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-black/60 via-white/2 to-black/40 border-gray-800/40"
            : "bg-white border-gray-300"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              className={`text-2xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Write a Learning
            </h2>
            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Share something new you learned — short, sweet, and stylish.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => {
                setContent(
                  (c) =>
                    `${c}\n🔖 Snapshot — ${new Date().toLocaleString()}`
                );
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border shadow-sm ${
                darkMode
                  ? "bg-gradient-to-tr from-[#1f2937]/60 to-[#111827]/50 border-gray-700/40 text-gray-200"
                  : "bg-gray-100 border-gray-300 text-gray-800"
              }`}
            >
              <Tag size={16} />
              <span className="text-xs">Snapshot</span>
            </motion.button>

            <div
              className={`flex items-center gap-2 text-xs px-3 py-2 rounded-xl border ${
                darkMode
                  ? "bg-white/3 border-gray-800/40 text-gray-300"
                  : "bg-gray-100 border-gray-300 text-gray-700"
              }`}
            >
              <Eye size={14} /> <span>{isPublic ? "Public" : "Private"}</span>
            </div>
          </div>
        </div>

        {/* Name input */}
        <div className="mt-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your display name"
            className={`w-full rounded-xl border p-3 outline-none focus:ring-2 transition mb-4 ${
              darkMode
                ? "bg-transparent border-gray-800/40 text-gray-200 placeholder-gray-500 focus:ring-indigo-500/30"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500/50"
            }`}
            required
          />
        </div>

        {/* Textarea */}
        <div className="mt-2 relative">
          <motion.textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            required
            maxLength={3000} // ✅ Enforce limit
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.18 }}
            className={`w-full resize-none rounded-xl p-4 outline-none focus:ring-2 transition-all ${
              darkMode
                ? "bg-gradient-to-b from-white/3 to-black/30 border border-gray-800/40 text-gray-100 placeholder-gray-500 focus:ring-indigo-500/30 caret-indigo-400"
                : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500/50 caret-indigo-600"
            }`}
            placeholder="Write your learning... (pro-tip: use bullet points for clarity)"
          />
        </div>

        {/* AI Description */}
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={generateDescription}
            disabled={loadingDesc}
            className="px-3 py-1 bg-indigo-600 text-white rounded shadow hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loadingDesc ? "Generating..." : "Generate Description"}
          </button>
        </div>

        {aiDescription && (
          <div className="mt-4">
            <label className="block mb-1 text-sm font-medium">
              AI Generated Description (editable)
            </label>
            <textarea
              value={aiDescription}
              onChange={(e) => setAiDescription(e.target.value)}
              rows={6}
              className="w-full rounded-xl p-4 border outline-none focus:ring-2"
            />
          </div>
        )}

        {/* Tags & Public */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags (comma separated)"
              className={`w-full rounded-lg border p-3 outline-none focus:ring-2 transition ${
                darkMode
                  ? "bg-transparent border-gray-800/40 text-gray-200 placeholder-gray-500 focus:ring-pink-500/25"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-pink-500/40"
              }`}
            />

            <label
              className={`mt-2 inline-flex items-center gap-2 text-sm ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className={`h-4 w-4 rounded focus:ring-indigo-400 ${
                  darkMode
                    ? "bg-white/5 border-gray-700 text-indigo-500"
                    : "bg-white border-gray-400 text-indigo-600"
                }`}
              />
              <span>Make Public</span>
              <span className="ml-2 text-xs text-gray-500">
                (visible to everyone)
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-gradient-to-tr from-indigo-600 to-pink-600 text-white font-semibold shadow-xl hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                <Send size={16} />
              )}
              <span>{loading ? "Saving..." : "Save Entry"}</span>
            </motion.button>
          </div>
        </div>

        {/* Toast */}
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`mt-4 w-full rounded-lg p-3 text-sm shadow-lg border ${
              toastType === "success"
                ? darkMode
                  ? "bg-gradient-to-r from-emerald-700/10 to-emerald-700/5 border-emerald-600/20 text-emerald-200"
                  : "bg-emerald-50 border-emerald-200 text-emerald-800"
                : darkMode
                ? "bg-gradient-to-r from-rose-700/8 to-rose-700/5 border-rose-600/20 text-rose-200"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-6 text-xs flex items-center justify-between text-gray-500">
          <div className="flex items-center gap-2">
            <Lock size={12} />
            <span>Encrypted locally • Private by default</span>
          </div>
          <div>
            Character limit:{" "}
            <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
              3000
            </span>
          </div>
        </div>
      </motion.form>

      {/* My Entries List */}
      <div className="w-full max-w-2xl mt-10">
        <h3
          className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          My Entries
        </h3>

        {myEntries.length === 0 ? (
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            No entries found. Submit something above!
          </p>
        ) : (
          <div className="space-y-4">
            {myEntries.map((entry) => (
              <div
                key={entry._id}
                className={`p-4 rounded-lg border shadow-sm ${
                  darkMode
                    ? "bg-black/30 border-gray-700"
                    : "bg-white border-gray-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">
                    {entry.content.slice(0, 50)}...
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      entry.isPublic
                        ? "bg-green-500/20 text-green-700"
                        : "bg-yellow-500/20 text-yellow-700"
                    }`}
                  >
                    {entry.isPublic ? "Public" : "Private"}
                  </span>
                </div>
                {entry.disc && (
                  <p className="mt-1 text-sm opacity-70">{entry.disc}</p>
                )}
                <button
                  onClick={() => deleteEntry(entry._id)}
                  disabled={deletingId === entry._id}
                  className="mt-3 text-sm text-red-500 hover:underline disabled:opacity-50"
                >
                  {deletingId === entry._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryForm;
