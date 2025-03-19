import Chat from "../models/Chat.js"; 

export const sendMessage = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { freelancerId, message, clientId } = req.body;
    console.log("client id", clientId)

    let chat = await Chat.findOne({ projectId });

    if (!chat) {
      if (!clientId) {
        return res.status(400).json({ message: "clientId is required to create a new chat" });
      }

      chat = new Chat({
        projectId,
        clientId,
        messages: [{ senderId, message }]
      });

      await chat.save();
      return res.status(201).json({ message: "New chat created and message sent!", chat });
    }

    chat.messages.push({ senderId, message });
    await chat.save();

    res.status(200).json({ message: "Message sent!", chat });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
