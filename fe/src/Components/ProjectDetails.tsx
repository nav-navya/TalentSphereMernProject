import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Project {
  _id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  skills: string[];
  deadline: string;
  images: string;
  clientId: string; // Ensure this field exists in your project API response
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/api/project/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!project) return <p className="text-white">Project not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black py-12 text-white">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-purple-400">Project Title: {project.title}</h1>
        <p className="mt-2 text-gray-400">description: {project.description}</p>

        <div className="mt-4 flex gap-4">
          <span className="bg-purple-600 px-3 py-1 rounded-full">category: {project.category}</span>
          <span className="bg-pink-600 px-3 py-1 rounded-full">Budget: ${project.budget}</span>
        </div>

       


        {project.images && (
          <img src={project.images} alt={project.title} className="mt-6 rounded-lg w-full" />
        )}

       

        <div className="mt-6">
          
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
