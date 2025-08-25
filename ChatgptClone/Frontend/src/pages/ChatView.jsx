import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";
import { fetchMessages, addMessage } from "../Store/Slices/messageSlice";
import { initSocket, getSocket } from "../services/socket";
import { setCurrentChat } from "../Store/Slices/chatSlice";

export default function ChatView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const messagesState = useSelector((s) => s.messages);
  const chatState = useSelector((s) => s.chat);
  const socket = getSocket();

  useEffect(() => {
    // set current chat in store
    if (id) {
      const chosen = chatState.chats?.find((c) => c._id === id);
      if (chosen) dispatch(setCurrentChat(chosen));
    }
  }, [id, chatState.chats, dispatch]);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMessages(id));
  }, [id, dispatch]);

  useEffect(() => {
    // subscribe to socket events for ai-response and updates
    const s = socket || initSocket();
    const onAiResponse = (payload) => {
      // payload.Responses is a string (server code returns Response)
      const chatId = id;
      const message = {
        _id: `m-${Date.now()}`,
        user: null,
        chat: chatId,
        content: payload.Responses || payload.Response,
        role: "model",
        createdAt: new Date().toISOString(),
      };
      dispatch(addMessage({ chatId, message }));
    };
    s.on("ai-response", onAiResponse);
    return () => {
      s.off("ai-response", onAiResponse);
    };
  }, [id, socket, dispatch]);

  const messages = messagesState.byChat[id] || [];

  return (
    <div className="flex-1 flex flex-col bg-[#18181b] min-h-0">
      <div className="flex-1 overflow-y-auto p-0 md:p-6 min-h-0">
        <div className="max-w-3xl mx-auto w-full">
          {messages.length === 0 && (
            <div className="text-center text-gray-300 mt-20">
              Start the conversation by sending a message
            </div>
          )}
          {messages.map((m) => (
            <MessageBubble key={m._id} message={m} />
          ))}
        </div>
      </div>
      <div className="border-t border-[#232329] p-2 md:p-4 bg-[#18181b]">
        <MessageInput chatId={id} />
      </div>
    </div>
  );
}
