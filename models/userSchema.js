const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
  name: {
    type: String,
    requried: true
  },

  age: {
    type: Number,
    requried: true
  },

  email: {
    type: String,
    unique: true,
    requried: true
  },

  mobile: {
    type: String
  },

  address: {
    type: String
  },

  adharcardNumber: {
    type: Number,
    requried: true
  },
  
  password: {
    type: String,
    requried : true
  },

  role : {
    type : String,
    enum: ["voter", "admin"],
    default : "voter"
  },

  isVoted : {
    type : Boolean,
    default : false
  }
});

const users = mongoose.model('users', userSchema);
module.exports = users;
