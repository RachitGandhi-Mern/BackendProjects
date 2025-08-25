require('dotenv').config()
const app = require('./src/app')
const connectToDb = require('./src/config/db')
const initSocketServer = require('./src/sockets/socket.server')


const { createServer } = require("http");
const httpServer = createServer(app);

connectToDb()
initSocketServer(httpServer)

const PORT = process.env.PORT
httpServer.listen(PORT,()=>{
console.log(`Server Is Running On Port ${PORT}`)
})