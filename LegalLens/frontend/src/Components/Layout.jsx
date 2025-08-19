import React from 'react'
import Navbar from './NavBar'

export default function Layout({ children }){
  return (
    <div className="w-full min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
      <Navbar />
      <main className="flex-1 w-full max-w-[100%]">
        {children}
      </main>
    </div>
  )
}
