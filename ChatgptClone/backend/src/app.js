const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')



// Auth Routes
const authRoute = require('./Routes/auth.Route')
const chatRoute = require('./Routes/chat.Route')




app.use(express.json())
app.use(cookieParser())


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai--chatgpt.vercel.app"  
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
 


// Using AuthRoutes
app.use('/api/auth',authRoute)
app.use('/api/chat',chatRoute)




module.exports = app