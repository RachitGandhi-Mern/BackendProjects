import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, createChat, setCurrentChat } from "../Store/Slices/chatSlice";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  BookOpen,
  Play,
  Grid3x3,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import axios from "../utils/api";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chats, currentChat } = useSelector((s) => s.chat);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(true);
   const [user, setUser] = useState(null);
   console.log(user)


  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const handleCreate = async () => {
    if (!title.trim()) return;
    const result = await dispatch(createChat({ title }));
    if (result.payload) {
      dispatch(setCurrentChat(result.payload));
      navigate(`/chat/${result.payload._id}`);
      setTitle("");
    }
  };


useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth/me", { withCredentials: true });
      setUser(res.data.fullname);

    } catch (error) {
      console.log("No logged in user", error);
    }
  };
  fetchUser();
}, []);

  // initials nikalne ka function
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-3 right-[-40px] z-50 p-2 rounded-md bg-black text-white hover:bg-neutral-800 transition-colors"
      >
        {open ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-0"
        } h-screen bg-black text-neutral-200 flex flex-col border-r border-neutral-800 transition-all duration-300 overflow-hidden`}
      >
        {/* Top Options + Input */}
        <div className="flex flex-col gap-2 px-3 py-4 border-b border-neutral-800">
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <Plus size={18} />
            <span>New chat Click Here</span>
          </button>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg px-3 py-2 bg-neutral-900 text-white placeholder:text-neutral-500 border border-neutral-700 focus:outline-none focus:border-blue-500 text-sm"
            placeholder="New Chat Title....."
          />


          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <BookOpen size={18} />
            <span>Library</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <Play size={18} />
            <span>Sora</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <Grid3x3 size={18} />
            <span>GPTs</span>
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
          <div className="text-xs font-semibold text-neutral-400 mb-2 px-2">CHATS</div>
          <div className="flex flex-col gap-1">
            {chats?.map((c) => (
              <div
                key={c._id}
                onClick={() => navigate(`/chat/${c._id}`)}
                className={`flex flex-col px-3 py-2 rounded-lg cursor-pointer transition-colors
                  ${currentChat?._id === c._id
                    ? "bg-neutral-800 text-white font-semibold"
                    : "hover:bg-neutral-700 text-neutral-200"
                  }`}
              >
                <div className="truncate">{c.title}</div>
                <div className="text-xs text-neutral-400 mt-1">
                  {new Date(c.lastActivity || c.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 flex items-center gap-2">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
        {getInitials(user || "U")}
      </div>
      <div className="flex flex-col text-xs">
        <span className="font-medium">{user || "Guest"}</span>
        <span className="text-neutral-400">Free</span>
      </div>
    </div>
      </aside>
    </div>
  );
}
