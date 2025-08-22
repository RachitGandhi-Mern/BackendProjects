const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["user","model"],
        default:"user"
    }
},{timestamps:true,versionKey: false,})


const messageModel = mongoose.model('Message', messageSchema)
module.exports = messageModel