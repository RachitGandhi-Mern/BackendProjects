import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ThemeToggle from './ThemeToggle'
import { logout } from '../Features/authSlice'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Access auth state
  const { token, user } = useSelector((state) => state.auth)
  // Load user from localStorage if Redux state empty
  useEffect(() => {
    if (!user && token) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        // Dispatch an action to set user in Redux if you have one
        dispatch({ type: 'auth/setUser', payload: JSON.parse(storedUser) })
      }
    }
  }, [user, token, dispatch])
  
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }
  
  const isLoggedIn = !!token 
  
  return (
    <nav className="w-full border-b border-gray-800/20 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">
          LegalParse<span className="text-sm ml-2 opacity-70">AI</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="hidden md:inline-block px-3 py-1 rounded-md">
            Dashboard
          </Link>
          {/* Conditional Login/Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}