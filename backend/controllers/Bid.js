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



export const acceptBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    // Find the bid
    const bid = await Bid.findById(bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    // Find the associated project
    const project = await Project.findById(bid.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Mark this bid as accepted
    bid.status = "accepted";
    await bid.save();

    // Store the accepted bid ID in the project
    project.acceptedBidId = bidId;
    project.status = "in progress"; // Update project status
    await project.save();

    // Delete all other bids for the same project
    await Bid.deleteMany({ projectId: bid.projectId, _id: { $ne: bidId } });

    res.status(200).json({ message: "Bid accepted and other bids deleted!", acceptedBid: bid });
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