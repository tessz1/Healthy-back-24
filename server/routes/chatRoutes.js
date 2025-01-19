import express from "express";
import Chat from "../models/messageModel.js";

const router = express.Router();

router.get("/messages", async (req, res) => {
  try {
    const messages = await Chat.find({}).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/messages", async (req, res) => {
  const { sender, content } = req.body;
  if (!sender || !content) {
    return res
      .status(400)
      .json({ message: "Please provide sender and content." });
  }

  try {
    const newMessage = new Chat({ sender, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
