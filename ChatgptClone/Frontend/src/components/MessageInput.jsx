import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../Store/Slices/messageSlice";
import { getSocket } from "../services/socket";

export default function MessageInput({ chatId }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const send = async () => {
    if (!prompt.trim() || !chatId) return;
    setLoading(true);

    const messageObj = {
      _id: `m-${Date.now()}`,
      user: null,
      chat: chatId,
      content: prompt,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage({ chatId, message: messageObj }));

    const socket = getSocket();
    socket.emit("ai-message", { chat: chatId, message: prompt });

    setPrompt("");
    setLoading(false);
  };

  return (
    <div className="w-full px-4 py-6 flex items-center justify-center ">
      {/* Floating glass input bar */}
      <div className="flex w-full max-w-3xl items-center gap-3 bg-white/5 backdrop-blur4xl rounded-full px-4 py-3 shadow-lg">
        
        {/* + Button */}
        <button
          type="button"
          disabled={loading}
          className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 text-white text-lg hover:bg-white/20 transition-all active:scale-95"
          aria-label="Add"
        >
          +
        </button>

        {/* Input */}
        <textarea
          className="flex-1 resize-none bg-transparent text-white placeholder:text-gray-300 px-2 text-[15px] leading-relaxed border-0 focus:ring-0 focus:outline-none min-h-[24px] max-h-36 font-sans"
          placeholder="Ask anything"
          rows={1}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />

        {/* Mic Button */}
        <button
          type="button"
          className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all active:scale-95"
          aria-label="Voice input"
        >
          🎤
        </button>

        {/* Send Button */}
        <button
          onClick={send}
          disabled={loading || !prompt.trim()}
          className={`flex items-center justify-center h-9 w-9 rounded-full transition-all duration-300 
            ${
              loading || !prompt.trim()
                ? "bg-white/10 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-b from-white to-gray-200 text-black shadow-md hover:scale-105 active:scale-95"
            }`}
          aria-label="Send message"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
