import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ThemeToggle from './ThemeToggle'
import { logout } from '../Features/authSlice'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.auth)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!user && token) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        dispatch({ type: 'auth/setUser', payload: JSON.parse(storedUser) })
      }
    }
  }, [user, token, dispatch])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
    setIsOpen(false)
  }

  const isLoggedIn = !!token

  return (
    <nav className="w-full border-b border-gray-800/20 py-5 backdrop-blur-md z-50 sticky top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl">
          LegalParse<span className="text-sm ml-2 opacity-70">AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/dashboard"
            className="relative px-4 py-1 rounded-xl font-medium tracking-wide 
             text-white bg-gradient-to-r from-gray-900  to-black
             border shadow-[0_4px_20px_rgba(0,0,0,0.4)]
             hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]
             hover:border-yellow-400
             transition-all duration-500 ease-in-out
             overflow-hidden group"
          >
            Dashboard
          </Link>
            <Link
            to="/LegalChat"
            onClick={() => setIsOpen(false)}
            className="relative px-4 py-1 rounded-xl font-medium tracking-wide 
             text-white bg-gradient-to-r from-gray-900  to-black
             border shadow-[0_4px_20px_rgba(0,0,0,0.4)]
             hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]
             hover:border-yellow-400
             transition-all duration-500 ease-in-out
             overflow-hidden group"
          >
            Ai Chat
          </Link>
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
              className="relative px-4 py-1 rounded-xl font-medium tracking-wide 
             text-white bg-gradient-to-r from-gray-900  to-black
             border shadow-[0_4px_20px_rgba(0,0,0,0.4)]
             hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]
             hover:border-yellow-400
             transition-all duration-500 ease-in-out
             overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                   translate-x-[-100%] group-hover:translate-x-[100%] 
                   transition-transform duration-700 ease-in-out"></span>
            </Link>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 mt-4 pb-4 border-t border-gray-700">
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="relative px-4 py-1 rounded-xl font-medium tracking-wide 
             text-white bg-gradient-to-r from-gray-900  to-black
             border shadow-[0_4px_20px_rgba(0,0,0,0.4)]
             hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]
             hover:border-yellow-400
             transition-all duration-500 ease-in-out
             overflow-hidden group"
          >
            Dashboard
          </Link>
          <Link
            to="/LegalChat"
            onClick={() => setIsOpen(false)}
            className="relative px-4 py-1 rounded-xl font-medium tracking-wide 
             text-white bg-gradient-to-r from-gray-900  to-black
             border shadow-[0_4px_20px_rgba(0,0,0,0.4)]
             hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]
             hover:border-yellow-400
             transition-all duration-500 ease-in-out
             overflow-hidden group"
          >
            Ai Chat
          </Link>
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
              onClick={() => setIsOpen(false)}
              className="relative px-4 py-1 rounded-xl font-medium tracking-wide 
             text-white bg-gradient-to-r from-gray-900  to-black
             border shadow-[0_4px_20px_rgba(0,0,0,0.4)]
             hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]
             hover:border-yellow-400
             transition-all duration-500 ease-in-out
             overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                   translate-x-[-100%] group-hover:translate-x-[100%] 
                   transition-transform duration-700 ease-in-out"></span>
            </Link>
          )}
          <ThemeToggle />
        </div>
      )}
    </nav>
  )
}

