const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(

  {
    sender: String,

    receiver: String,

    text: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      default: ""
    },

    audio: {
      type: String,
      default: ""
    },

    seen: {
      type: Boolean,
      default: false
    },

    deletedFor: {
      type: [String],
      default: []
    }
  },

  {
    timestamps: true
  }

);

module.exports =
  mongoose.model("Message", messageSchema);