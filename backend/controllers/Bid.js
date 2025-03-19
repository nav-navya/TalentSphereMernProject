import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Project from "../models/projects.js";


export const placeBid = async (req,res) =>
{
  try
  {


    const {projectId,bidAmount,duration} = req.body;
    const freelancerId = req.user.userId


    const project = await Project.findById(projectId)
    if(!project){
      return res.status(500).json({message:"no project Found..."})
    }
    //create and save bid..
    const bid =await Bid.create({projectId,freelancerId,bidAmount,duration})
    res.status(201).json({success:true,bid});
  }
  catch(error){
  res.status(500).json({message:"error occured..",error})
  }
}




export const getBid = async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log("Fetching bids for projectId:", projectId);

    const bids = await Bid.find({ projectId }).populate("freelancerId", "name email");

    if (!bids.length) {
      return res.status(404).json({ success: false, message: "No bids found for this project." });
    }

    res.status(200).json({ success: true,message:"what", bids });
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(500).json({ success: false, message: "Error occurred while fetching bids.", error });
  }
};





// export const acceptBid = async (req, res) => {
//   try {
//     const { bidId } = req.params;
//     const bid = await Bid.findById(bidId).populate("projectId freelancerId");

//     if (!bid) return res.status(404).json({ message: "Bid not found" });

//     // Update bid status to 'accepted'
//     bid.status = "accepted";
//     await bid.save();

//     // Delete all other bids for this project
//     await Bid.deleteMany({ projectId: bid.projectId, _id: { $ne: bidId } });

//     // Check if a chat already exists
//     const existingChat = await Chat.findOne({ projectId: bid.projectId });

//     if (!existingChat) {
//       // Create a new chat
//       const newChat = new Chat({
//         projectId: bid.projectId,
//         clientId: bid.projectId.clientId,
//         freelancerId: bid.freelancerId._id,
//         messages: [],
//       });
//       await newChat.save();
//     }

//     res.status(200).json({ message: "Bid accepted and chat created!" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };




export const acceptBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    // Find the bid
    const bid = await Bid.findById(bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    // Mark this bid as accepted
    bid.status = "accepted";
    await bid.save();

    // Delete all other bids for the same project
    await Bid.deleteMany({ projectId: bid.projectId, _id: { $ne: bidId } });

    // Get project details
    const project = await Project.findById(bid.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Create a chat session
    const chatExists = await Chat.findOne({ projectId: bid.projectId });
    if (!chatExists) {
      await Chat.create({
        projectId: bid.projectId,
        clientId: project.clientId, // Assuming project has clientId
        freelancerId: bid.freelancerId,
        messages: [],
      });
    }

    res.status(200).json({ message: "Bid accepted, other bids deleted, and chat started!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};




export const deleteBid = async (req, res) => {
  try {
    const bidId = req.params.bidId.trim(); 

    if (!mongoose.Types.ObjectId.isValid(bidId)) {
      return res.status(400).json({ message: "Invalid bid ID" });
    }

    const bid = await Bid.findByIdAndDelete(bidId);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    res.status(200).json({ message: "Bid deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};