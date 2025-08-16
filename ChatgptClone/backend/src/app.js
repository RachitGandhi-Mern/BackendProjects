const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')




// Auth Routes
const authRoute = require('./Routes/auth.Route')


const connectToDb = require('./config/db')
connectToDb()


app.use(express.json())
app.use(cookieParser())


// Using AuthRoutes
app.use('/api/auth',authRoute)




module.exports = app