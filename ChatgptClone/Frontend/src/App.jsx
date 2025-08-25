// App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./components/Sidebar";
import ChatView from "./pages/ChatView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { initSocket } from "./services/socket";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { checkAuth } from "./Store/Slices/authSlice";

function ProtectedRoute({ children }) {
  const auth = useSelector((s) => s.auth);
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const s = initSocket();
      s.on("ai-response", (payload) => {
        console.log("ai-response", payload);
      });
    }
  }, [auth.isAuthenticated]);

  return (
    <div className="h-screen flex bg-background transition-colors duration-300">
      {auth.isAuthenticated && <Sidebar />}
      <div className="flex-1 flex flex-col relative">
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ChatView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
                <ChatView />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}
