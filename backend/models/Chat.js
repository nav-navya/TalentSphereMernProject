// import mongoose from "mongoose";

// const chatSchema = new mongoose.Schema(
//   {
//     projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
//     clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     messages: [
//       {
//         senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//         message: { type: String, required: true },
//         timestamp: { type: Date, default: Date.now },
//       }
//     ]
//   },
//   { timestamps: true }
// );

// const Chat = mongoose.model("Chat", chatSchema);
// export default Chat;




import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  senderId: { type: String, required: true }, // This field is required
  message: { type: String, required: true }, // Ensure message is included
  timestamp: { type: Date, default: Date.now }
});

const ChatSchema = new mongoose.Schema({
  freelancerId: { type: String, required: true }, // Required field
  clientId: { type: String, required: true }, // Required field
  messages: [MessageSchema] // Array of messages
});

export default mongoose.model("Chat", ChatSchema);
