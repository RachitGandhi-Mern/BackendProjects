const mongoose = require('mongoose')

function ConnectToDb (){
  mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{
    console.log("Connect To Database")
  })
  .catch(error=>{
    console.log(error , error.message)
  })
}

module.exports = ConnectToDb