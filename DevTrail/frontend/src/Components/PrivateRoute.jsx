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
    
    console.log('PrivateRoute: Checking token:', token ? 'Token exists' : 'No token found');

    // Token nahi hai to direct unauthenticated
    if (!token) {
      console.log('PrivateRoute: No token, redirecting to login');
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    // API se auth verify
    const checkAuth = async () => {
      try {
        // Token ko headers mein manually set kar rahe hain
        const response = await API.get("/api/auth/getUser", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('PrivateRoute: Auth API response status:', response.status);
        
        if (response.status === 200 && response.data) {
          console.log('PrivateRoute: User authenticated successfully');
          setIsAuthenticated(true);
        } else {
          console.log('PrivateRoute: Invalid response from auth API');
          setIsAuthenticated(false);
          // Invalid token ko remove kar do
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error('PrivateRoute: Auth check failed:', error.response?.status, error.message);
        
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log('PrivateRoute: Token expired or invalid, removing token');
          // Token expired/invalid hai to remove kar do
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        } else {
          // Network error ya koi aur issue
          console.log('PrivateRoute: Network or other error, assuming unauthenticated');
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    console.log('PrivateRoute: User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Authenticated - render children
  console.log('PrivateRoute: User authenticated, rendering protected component');
  return children;
};

export default PrivateRoute;