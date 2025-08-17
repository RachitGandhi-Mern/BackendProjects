const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true, trim: true },
    email:{type: String, required: true, unique: true , lowercase: true, trim: true},
    password:{type: String, required: true,}
},{timestamps:true})

const UserModel = mongoose.model('User',UserSchema)

module.exports = UserModel