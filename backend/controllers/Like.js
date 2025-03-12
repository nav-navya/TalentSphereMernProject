import Like from '../models/Likes'

export const toggleLike = async (req,res) =>{
  
  const {projectId} = req.params;
  const {userId} = req.body

  const existingLike = await Like.findOne({projectId,userId})

  if(existingLike){
    await Like.findByIdAndDelete(existingLike._id)
    return res.json({message:"unlied the project",liked:false})
    
  }
  else{
    await Like.create({projectId,userId})
    return res.json({message:"Liked the project successfully" ,liked:true})
  }
}
 export const getTotalLikes = async (req,res) => {
  const {projectId} = req.params
  const count = await Like.countDocuments({projectId})
  res.json(count)
 }
