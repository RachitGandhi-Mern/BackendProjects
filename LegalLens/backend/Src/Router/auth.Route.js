const express = require('express')
const { Register, Login, me, Logout } = require('../Controllers/authController')
const { ProtectedRoute } = require('../Middleware/ProtectedRoute')
const Router = express.Router()


Router.post('/register', Register)
Router.post('/login',Login)
Router.get('/me',ProtectedRoute,me)
Router.post('/logout',ProtectedRoute,Logout)


module.exports = Router