import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../Store/Slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft, FaApple, FaPhone } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 👁 eye icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await dispatch(loginUser({ email, password }));
    setLoading(false);
    if (!res.error) {
      navigate("/");
    } else {
      alert("Login failed: " + JSON.stringify(res.payload || res.error));
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      {/* Logo top-left */}
      <div className="absolute top-4 left-6 text-lg font-semibold">ChatGPT</div>

      {/* Login box */}
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm border border-gray-200">
        <h1 className="mb-2 text-center text-2xl font-semibold text-black">
          Log in or sign up
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          You’ll get smarter responses and can upload files, images, and more.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password with eye toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-md border border-gray-300 px-4 py-3 pr-10 text-black placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {/* Continue button with loading animation */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-full py-3 font-medium transition-colors flex items-center justify-center ${
              loading
                ? "bg-gray-800 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="px-3 text-xs uppercase text-gray-500">or</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        {/* Social buttons */}
        <div className="space-y-3">
          <button className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white py-3 text-sm font-medium hover:bg-gray-50">
            <FaPhone className="text-gray-600" /> Continue with phone
          </button>
          <button className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white py-3 text-sm font-medium hover:bg-gray-50">
            <FcGoogle className="text-lg" /> Continue with Google
          </button>
          <button className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white py-3 text-sm font-medium hover:bg-gray-50">
            <FaMicrosoft className="text-blue-600" /> Continue with Microsoft Account
          </button>
          <button className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white py-3 text-sm font-medium hover:bg-gray-50">
            <FaApple className="text-black" /> Continue with Apple
          </button>
        </div>
{/* Bottom links */}
        <div className="mt-8 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
          <div className="mt-4">
            <Link to="/terms" className="hover:underline">
              Terms of Use
            </Link>{" "}
            |{" "}
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
   
      </div>
    </div>
  );
}
