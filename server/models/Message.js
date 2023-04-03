const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});
const Message = mongoose.model("message", MessageSchema);
module.exports = Message;
