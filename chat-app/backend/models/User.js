const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePic:{
  type:String,
  default:""
},
otp: {
  type: String,
  default: ""
},

otpExpire: {
  type: Date
},
});

module.exports = mongoose.model("User", schema);