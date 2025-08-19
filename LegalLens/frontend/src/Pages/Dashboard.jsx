import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../Features/fileSlice";
import {
  listAnalyses,
  analyzeFile,
  analyzeText,
  deleteAnalysis,
} from "../Features/analysisSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useTheme from "../utils/theme";
import { FileText, Upload, Clock, Trash2, Eye, Plus } from "lucide-react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const analyses = useSelector((s) => s.analysis.items || []);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const { theme } = useTheme();  // reactive theme
  const isDark = theme === "dark";

  useEffect(() => {
    dispatch(listAnalyses());
  }, [dispatch]);

  const upload = async (e) => {
    e.preventDefault();
    if (!file && !text) return toast.error("Attach file or paste text");

    try {
      let analysis;

      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        const uploaded = await dispatch(uploadFile(fd)).unwrap();

        try {
          analysis = await dispatch(analyzeFile(uploaded.fileId)).unwrap();
        } catch (err) {
          return toast.error(
            err.message || "Analysis failed. Please upload a text-based PDF."
          );
        }
      } else {
        analysis = await dispatch(analyzeText(text)).unwrap();
      }

      toast.success("Analyzed: " + (analysis.filename || "Text"));
      setFile(null);
      setText("");
    } catch (err) {
      console.error(err);
      toast.error("Failed");
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <main className="max-w-6xl mx-auto px-8">
        <section className="pt-20 pb-12">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-8 ${
              isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-black/5 text-black border border-black/10'
            }`}>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Analysis workspace
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Dashboard
              <br />
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Manage your analyses</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl leading-[1.6] mb-10 max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Upload documents or paste text to get instant legal analysis. View, manage, and track all your document insights in one place.
            </p>
          </div>
        </section>

        {/* Upload Section */}
        <section className="py-12">
          <div className={`p-8 rounded-2xl border ${isDark ? 'border-white/10 hover:border-white/20 bg-white/5' : 'border-black/10 hover:border-black/15 bg-black/5'} transition-all duration-300`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
                <Plus size={24} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">New Analysis</h2>
            </div>
            
            <form onSubmit={upload} className="space-y-6">
              {/* File Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold tracking-tight">Upload Document</label>
                <div className={`relative rounded-lg border-2 border-dashed transition-all duration-200 ${
                  isDark ? 'border-white/20 hover:border-white/30 bg-white/5' : 'border-black/20 hover:border-black/30 bg-black/5'
                } ${file ? (isDark ? 'border-green-400/50 bg-green-400/10' : 'border-green-500/50 bg-green-500/10') : ''}`}>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="p-6 text-center">
                    <Upload size={32} className={`mx-auto mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {file ? file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      PDF, DOC, DOCX, TXT files supported
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold tracking-tight">Or Paste Text</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your legal document text here for instant analysis..."
                  className={`w-full h-32 p-4 rounded-lg border transition-all duration-200 resize-none ${
                    isDark 
                      ? 'border-white/20 bg-black/20 text-white placeholder-gray-400 focus:border-white/40 focus:bg-black/30' 
                      : 'border-black/20 bg-white/80 text-black placeholder-gray-500 focus:border-black/40 focus:bg-white'
                  } focus:outline-none focus:ring-0`}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  isDark ? 'bg-white text-black hover:bg-gray-100 shadow-lg shadow-white/10' : 'bg-black text-white hover:bg-gray-900 shadow-lg shadow-black/10'
                }`}
              >
                <FileText size={16} strokeWidth={2} />
                Upload & Analyze
              </button>
            </form>
          </div>
        </section>

        {/* Recent Analyses Section */}
        <section className="py-12 pb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Recent Analyses</h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {analyses.length === 0 
                ? 'No analyses yet. Upload your first document to get started.' 
                : `${analyses.length} document${analyses.length > 1 ? 's' : ''} analyzed`
              }
            </p>
          </div>

          {analyses.length === 0 ? (
            <div className={`p-12 rounded-2xl border text-center ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
              <FileText size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <p className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>No analyses yet</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Upload your first document to see it here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {analyses.map((a) => (
                <div key={a._id} className={`group p-6 rounded-2xl border transition-all duration-300 ${isDark ? 'border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10' : 'border-black/10 hover:border-black/15 bg-black/5 hover:bg-black/10'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-white/10 group-hover:bg-white/15' : 'bg-black/5 group-hover:bg-black/10'}`}>
                        <FileText size={20} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold tracking-tight mb-1">
                          {a.filename || "Text Analysis"}
                        </h3>
                        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Clock size={14} />
                          <span>{new Date(a.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        to={"/analysis/" + a._id}
                        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                          isDark 
                            ? 'border-white/20 hover:border-white/30 hover:bg-white/10 text-white' 
                            : 'border-black/20 hover:border-black/30 hover:bg-black/5 text-black'
                        }`}
                      >
                        <Eye size={14} />
                        View
                      </Link>
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-lg shadow-red-500/20"
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this analysis?")) {
                            try {
                              await dispatch(deleteAnalysis(a._id)).unwrap();
                              toast.success("Deleted successfully");
                            } catch (err) {
                              toast.error("Failed to delete");
                            }
                          }
                        }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}