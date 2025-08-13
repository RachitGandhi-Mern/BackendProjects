// // src/Components/PrivateRoute.jsx
// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import API from "../api/apiconfig";

// const PrivateRoute = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await API.get("/api/auth/getUser");
//         setIsAuthenticated(true);
//       } catch (err) {
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   if (loading) return <div className="p-6">Checking authentication...</div>;

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;


import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api/apiconfig";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Token hi nahi to direct unauthenticated
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    // API se auth verify
    const checkAuth = async () => {
      try {
        const res = await API.get("/api/auth/getUser");
        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setIsAuthenticated(false);
        } else {
          console.error("Auth check failed:", err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;