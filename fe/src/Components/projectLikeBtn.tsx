import { useEffect, useState } from "react"
import axios from "axios"

interface props{

  projectId:string,
  userId:string
}

const ProjectLike:React.FC<props> = ({projectId ,userId}) => {

  const [liked,setLiked] = useState(false)
  const [likes,setLikes] = useState(0)

  useEffect(()=>{
    fetchLikes()},[])

  const fetchLikes = async() =>{
    const response = await axios.get(`api/projectLike/likes/${projectId}`)
    setLikes(response.data.count)
  }

  const handleLike = async () =>{
    const response = await axios.post(`api/projectLike${projectId}`,{userId})
    setLiked(response.data.liked)
    fetchLikes();


  }
  

return (
  <button onClick={handleLike} className="p-2 border rounded-md">
    {liked ? `Unlike (${likes})` : `Like (${likes})`}
  </button>
);
}



export default ProjectLike