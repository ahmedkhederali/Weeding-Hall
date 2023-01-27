const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto=require('crypto')

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please Enter firstName"],
  },
  lastname: {
    type: String,
    required: [true, "Please Enter lastName"],
  },
  firstnamear: {
    type: String,
    required: [true, "Please Enter firstName Arabic"],
  },
  lastnamear: {
    type: String,
    required: [true, "Please Enter lastName Arabic"],
  },
  email: {
    type: String,
    required: [true, "Please Enter email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please Enter phone"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minlength: [6, "name must be more than 6 character"],
  },
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    public_id: {
      type: String,
      
      default:"unknow user"
    },
    url: {
      type: String,
     
      default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  favorites: {
    type: Array,
    default: null
},
  resetPasswordToken:String,
  resetPasswordExpire:Date,

});

//Generate password reset token
UserSchema.methods.getRestPasswordToken=function(){
  //Generate Token
  const resetToken =crypto.randomBytes(20).toString("hex"); //like that 9341e20bff6b7dba15845c54bddb2c95bb66c137
  //Hashing and adding resetpasswordToken to userSchema
  this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
  this.resetPasswordExpire=Date.now() + 15*60*1000;
  return resetToken
}
module.exports = mongoose.model("User", UserSchema);
