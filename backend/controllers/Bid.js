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

export const getBid = async (req,res)=>{
  try{
    const {projectId} = req.params;
    const bids = await Bid.find({projectId}).populate("freelancerId", "name email");
    res.status(201).json({success:true,bids})


  }catch(error){
    res.status(500).json({message:"error occured..",error})

  }

}