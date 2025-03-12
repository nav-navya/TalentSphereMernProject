import express from "express";
import Message from '../models/message.model.js'

const router = express.Router();

// ✅ Send a message
router.post("/", async (req, res) => {
  const { conversationId, senderId, message } = req.body;

  try {
    const newMessage = new Message({
      conversationId,
      senderId,
      message,
    });

    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Get all messages of a conversation
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).populate("senderId", "name email"); // Populate sender details

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
