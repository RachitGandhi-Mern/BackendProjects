import { io } from "socket.io-client";

/**
 * Expose a function to create connection.
 * Socket authenticates via the cookie 'Token' set by backend.
 */

let socket;

export function initSocket() {
  if (socket) return socket;
  socket = io("https://backendprojects-1.onrender.com", {
    withCredentials: true,
    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connect_error:", err.message);
  });

  return socket;
}

export function getSocket() {
  return socket;
}
