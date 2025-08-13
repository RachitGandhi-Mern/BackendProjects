const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: { required: true, unique: true, type: String },
  email: { required: true, unique: true, type: String },
  password: { type: String, required: true },
});

userSchema.pre('save' , async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});
 
userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
};



module.exports = mongoose.model('User' , userSchema);

