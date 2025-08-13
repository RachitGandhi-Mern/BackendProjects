const express = require('express')
const Router = express.Router()
const {Signup, login, getUser, logout} = require('../Controllers/authController')
const authenticateUser = require('../Middleware/authenticateUser')


Router.post("/Signup", Signup)
Router.post('/Login',login )
Router.get('/logout',logout)
Router.get('/getUser',authenticateUser,getUser)

module.exports = Router