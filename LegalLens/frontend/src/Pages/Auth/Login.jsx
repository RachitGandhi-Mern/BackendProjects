import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {login} from '../../Features/authSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { LogIn, Mail, Lock } from 'lucide-react'

export default function Login(){
  const [email, setEmail] = useState(''), [password, setPassword] = useState('')
  const [theme, setTheme] = useState('dark')
  const dispatch = useDispatch()
  const nav = useNavigate()

  const isDark = theme === 'dark'

  const submit = async (e) => {
    e.preventDefault()
    try{
      await dispatch(login({email, password })).unwrap()
      toast.success('Logged in')
      nav('/dashboard')
    }catch(err){
      const message = err?.message || err?.data?.message || 'Login failed'
      toast.error(message)
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <main className="max-w-6xl mx-auto px-8">
        <section className="pt-20 pb-12">
          <div className="max-w-md mx-auto">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-8 ${
              isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-black/5 text-black border border-black/10'
            }`}>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Secure access
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-6 text-center">
              Welcome back
              <br />
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sign in to continue</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg leading-[1.6] mb-10 text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Access your legal document analysis dashboard and manage your insights.
            </p>
          </div>
        </section>

        {/* Login Form */}
        <section className="pb-20">
          <div className="max-w-md mx-auto">
            <div className={`p-8 rounded-2xl border ${isDark ? 'border-white/10 hover:border-white/20 bg-white/5' : 'border-black/10 hover:border-black/15 bg-black/5'} transition-all duration-300`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
                  <LogIn size={24} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Sign In</h2>
              </div>

              <form onSubmit={submit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold tracking-tight">
                    <Mail size={16} className="inline mr-2" />
                    Email Address
                  </label>
                  <input
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    placeholder="Email"
                    className={`w-full p-4 rounded-lg border transition-all duration-200 ${
                      isDark 
                        ? 'border-white/20 bg-black/20 text-white placeholder-gray-400 focus:border-white/40 focus:bg-black/30' 
                        : 'border-black/20 bg-white/80 text-black placeholder-gray-500 focus:border-black/40 focus:bg-white'
                    } focus:outline-none focus:ring-0`}
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold tracking-tight">
                    <Lock size={16} className="inline mr-2" />
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    className={`w-full p-4 rounded-lg border transition-all duration-200 ${
                      isDark 
                        ? 'border-white/20 bg-black/20 text-white placeholder-gray-400 focus:border-white/40 focus:bg-black/30' 
                        : 'border-black/20 bg-white/80 text-black placeholder-gray-500 focus:border-black/40 focus:bg-white'
                    } focus:outline-none focus:ring-0`}
                  />
                </div>

                {/* Submit Button */}
                <button className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isDark ? 'bg-white text-black hover:bg-gray-100 shadow-lg shadow-white/10' : 'bg-black text-white hover:bg-gray-900 shadow-lg shadow-black/10'
                  }`}>
                  <LogIn size={16} strokeWidth={2} />
                  Login
                </button>
              </form>

              {/* Additional Options */}
              <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Don't have an account?{' '}
                  <button 
                    onClick={() => nav('/register')}
                    className={`font-medium hover:underline transition-colors ${isDark ? 'text-white' : 'text-black'}`}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>

            {/* Security Notice */}
            <div className={`mt-6 p-4 rounded-lg border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
              <p className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🔒 Your login credentials are encrypted and secure. We never store your passwords in plain text.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}