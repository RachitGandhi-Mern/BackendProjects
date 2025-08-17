require('dotenv').config()
const app = require('./Src/App')






const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server Is Running On Port ${PORT}`)
})