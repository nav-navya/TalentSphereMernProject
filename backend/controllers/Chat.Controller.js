
import User from '../models/User.model.js'
import Message from '../models/messageModel.js';


//get all users except the calling one
export const getAllUsers = async (req,res)=>{
  try
 { 
  const allUsers = await User.find({},"_id name email");
  res.json(allUsers)
}
catch(error){
  res.status(500).json({message:"Server Error"})
}
}


/////send message////////
export const sendMessage = async (req,res) =>{
  try{
    const {sender,receiver,message} = req.body;

    const newMessage = new Message({sender,receiver,message})
    await newMessage.save();

    res.status(201).json(newMessage)
  }
  catch(error){
    res.status(500).json({message:"error occured.. in sending message..."})
  }
}

/////Get chat history./////
export const chatHistory = async (req,res) =>{
  try{
    const {userId,receiverId} = req.params;
    const messages = await Message.find({
      $or: [
        {sender:userId,receiver:receiverId},
        {sender: receiverId, receiver: userId},
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  }catch(error){
    res.status(500).json({message:"Error fetching chat history.."})
  }
}