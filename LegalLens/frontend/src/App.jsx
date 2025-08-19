import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Dashboard from './Pages/Dashboard'
import AnalysisView from './Pages/AnalysisView'
import Layout from './Components/Layout'
import  useTheme  from './utils/theme'
import { Toaster } from 'react-hot-toast'

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token)
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  const { init } = useTheme()
  useEffect(() => init(), [])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout><Home/></Layout>} />
        <Route path="/login" element={<Layout><Login/></Layout>} />
        <Route path="/register" element={<Layout><Register/></Layout>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout><Dashboard/></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analysis/:id"
          element={
            <ProtectedRoute>
              <Layout><AnalysisView/></Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}