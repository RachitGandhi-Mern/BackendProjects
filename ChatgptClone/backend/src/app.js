const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')



// Auth Routes
const authRoute = require('./Routes/auth.Route')
const chatRoute = require('./Routes/chat.Route')




app.use(express.json())
app.use(cookieParser())


// Using AuthRoutes
app.use('/api/auth',authRoute)
app.use('/api/chat',chatRoute)




module.exports = app