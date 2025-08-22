import React, { useState, useRef, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { useTheme } from "../Context/ThemeContext"
import api from "../utils/axios"

function PromptInputWithActions() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [fullName, setFullName] = useState("")
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  // Auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [prompt])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    const newMessage = { role: "user", text: prompt }
    const updatedMessages = [...messages, newMessage]

    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const res = await api.post("/legalchat/ask", {
        messages: updatedMessages,
      })

      const reply = res.data.reply
      setMessages((prev) => [...prev, { role: "model", text: reply }])
    } catch (err) {
      console.error("❌ API Error:", err.response?.data || err.message)
    } finally {
      setPrompt("")
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/auth/me")
        setFullName(res.data.user.fullname)
      } catch (err) {
        console.error("Error fetching user:", err)
      }
    }
    fetchUser()
  }, [])

  return (
    <div
      className={`flex flex-col h-screen w-full pt-20 ${
        isDark ? "bg-black text-white" : "bg-[#f9f6f7] text-black"
      }`}
    >
      {/* Greeting Screen (only if no messages yet) */}
      {messages.length === 0 && !isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <h1
            className={`text-2xl font-normal ${
              isDark ? "text-white/80" : "text-black/70"
            }`}
          >
            {isDark
              ? `What's on your mind today ${fullName}?`
              : `How can I help You, ${fullName}?`}
          </h1>

          {/* Input Centered */}
          <form
            onSubmit={handleSubmit}
            className={`flex items-center w-full max-w-2xl rounded-full px-4 py-2 border transition-colors ${
              isDark
                ? "bg-[#1a1a1a] border-[#333]"
                : "bg-white border-gray-300"
            }`}
          >
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything"
              rows={1}
              className={`flex-1 resize-none bg-transparent px-2 focus:outline-none text-base max-h-40 overflow-y-auto ${
                isDark
                  ? "text-white placeholder-gray-400"
                  : "text-black placeholder-gray-500"
              }`}
            />

            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                isDark
                  ? "bg-white text-black hover:bg-gray-200 disabled:bg-gray-400"
                  : "bg-black text-white hover:bg-neutral-800 disabled:bg-gray-400"
              }`}
            >
              {!isLoading ? (
                <ArrowUp size={18} />
              ) : (
                <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
              )}
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex w-full ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? isDark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : isDark
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className={`px-4 py-3 rounded-2xl text-sm flex gap-2 ${
                    isDark
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-200 text-black"
                  }`}
                >
                  <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-current rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input at bottom after chat starts */}
          <div
            className={`sticky bottom-0 w-full px-4 py-6 flex justify-center ${
              isDark ? "bg-black/90" : "bg-[#f9f6f7]/90"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className={`flex items-center w-full max-w-2xl rounded-full px-4 py-2 border transition-colors ${
                isDark
                  ? "bg-[#1a1a1a] border-[#333]"
                  : "bg-white border-gray-300"
              }`}
            >
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything"
                rows={1}
                className={`flex-1 resize-none bg-transparent px-2 focus:outline-none text-base max-h-40 overflow-y-auto ${
                  isDark
                    ? "text-white placeholder-gray-400"
                    : "text-black placeholder-gray-500"
                }`}
              />

              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                  isDark
                    ? "bg-white text-black hover:bg-gray-200 disabled:bg-gray-400"
                    : "bg-black text-white hover:bg-neutral-800 disabled:bg-gray-400"
                }`}
              >
                {!isLoading ? (
                  <ArrowUp size={18} />
                ) : (
                  <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default PromptInputWithActions
