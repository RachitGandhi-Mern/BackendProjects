const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Fullname: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    require:true
  }
}, {timestamps:true});

const userModel = mongoose.model("User",userSchema )
module.exports = userModel