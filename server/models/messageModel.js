import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", messageSchema);

export default Chat;
