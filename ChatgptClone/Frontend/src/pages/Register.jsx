import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft, FaApple, FaPhone } from "react-icons/fa";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser({ fullname, email, password }));
    if (!res.error) {
      navigate("/");
    } else {
      alert("Register failed: " + JSON.stringify(res.payload || res.error));
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      {/* Logo top-left */}
      <div className="absolute top-4 left-6 text-lg font-semibold">ChatGPT</div>

      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm border border-gray-200">
        <h1 className="mb-2 text-center text-2xl font-semibold text-black">
          Create your account
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Sign up to continue and access smarter responses.
        </p>

        {/* form (logic same as before) */}
        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Full name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="email"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded-full bg-black py-3 text-white font-medium hover:bg-gray-900"
          >
            Register
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
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
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
