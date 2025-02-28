import User from '../models/User.model.js'

const userProfile = async(req,res) => {

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

export default userProfile;
