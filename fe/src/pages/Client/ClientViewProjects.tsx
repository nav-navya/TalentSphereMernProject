

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Project {
  _id: string;
  title: string;
  description: string;
  image:""

}

const ClientProjects = () => {
  const { clientId } = useParams();
  const [projects, setProjects] = useState<Project[]>([]); // ✅ Correct Type

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>(`http://localhost:5003/api/project/client/${clientId}`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [clientId]);

  return (
    <div className="  ">
      <h2 className="text-4xl text-center">Client Projects</h2><br></br>
      
      <ul>
        {projects.map((project) => ( 
          
          <li key={project._id} className="container border-2 m-3 p-4 bg-blue-950 text-center w-1/4  rounded-2xl "> 
            <h3 className="text-2xl text-white">{project.title}</h3>
            <p className="text-white">{project.description}</p>

            <div>
              {project.image && <img src={project.image} alt={project.title} className="w-full h-auto rounded-lg" />}
            </div>
            
            <div className="">
              <button className="bg-white w-16 h-8 rounded-lg m-3 text-blue-950">Edit</button>
              <button className="bg-white w-16 h-8 rounded-lg m-3 text-blue-950">Delete</button>
            </div>
          </li>
        
        ))}
      </ul>
    </div>
  );
};

export default ClientProjects;
