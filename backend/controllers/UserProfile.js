import User from '../models/User.model.js'

export const userProfile = async(req,res) => {

  try{
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password")

    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    res.json(user)
  }catch(error){
    res.status(500).json({message:"Server error bleh"})
  }
}

export const userDetails = async(req,res) => {
  try{
    const {industry,location,bio,mobile,about} = req.body;
    const userId = req.user.userId

    //find usconst er & update details
    const updatedUser = await User.findByIdAndUpdate(userId,{
      industry,location,bio,mobile,about}, { new: true, runValidators: true })

      if(!updatedUser)
        return res.status(404).json({message:"user not found.."})

      res.json(updatedUser);

  }catch(error){
    console.error("error updating profile")
    res.status(404).json({message:"server error"})
  }
}


