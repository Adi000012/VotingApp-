const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({

  name: {
    type: String,
    requried: true
  },

  party : {
    type: String,
    requried: true
  },

  age : {
    type: Number,
    requried: true
  },

  votes: {
    type: [
        {
      user: 
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
        },
        
      votedAt: 
      { 
      type: Date, 
      default: Date.now 
    }
    }
],
    required: true
  },

  voteCount : {
    type: Number,
    default : 0
  }
});


const candidate = mongoose.model('candidate', candidateSchema);
module.exports = candidate;
