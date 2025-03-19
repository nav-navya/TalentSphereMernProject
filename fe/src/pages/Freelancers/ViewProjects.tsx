



import axios from "axios";
import { useState, useEffect } from "react";
import { Heart, MessageCircle } from 'lucide-react';
import { Link } from "react-router-dom";

interface Project {
  _id: string;
  title: string;
  description: string;
  budget: number;
  images: string;
}

export const FreelancerViewProject = () => {
  const [viewProjects, setViewProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/project/getprojects');
        setViewProjects(response.data);
        console.log("response", response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Calculate the start and end index for slicing
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = viewProjects.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 inline-block mb-4">Available Projects</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>
        
        {currentProjects.length > 0 ? (
          <div className="space-y-8">
            {currentProjects.map((project) => (
              <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden w-full border border-purple-500/20" key={project._id}>
                <div className="p-6 w-full">
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">{project.title}</h3>
                  <p className="text-gray-300 mt-3">{project.description}</p>


                  <Link to={`/project/${project._id}`}>
                  <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  View Details
                  </button>
                  </Link>


                  <p className="mt-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-lg">Budget: ${project.budget}</p>

                  <div className="relative mt-6 mb-4">
                    <div className="absolute -top-2 -left-2 w-full h-full border border-purple-500/50 rounded-lg"></div>
                    <div className="w-full h-60 relative z-10">
                      <img 
                        src={project.images} 
                        alt={project.title} 
                        className="w-full h-full object-contain rounded-lg" 
                      />
                    </div>
                  </div>
                </div>

                {/* Interaction Buttons */}
                <div className="flex justify-between p-6 border-t border-purple-500/20">
                  {/* Like Button */}
                  <div className="flex items-center space-x-2">
                    <button className="text-pink-500 hover:text-pink-400 transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                    <span className="text-gray-400">Like</span>
                  </div>

                  {/* View Bids Button */}
                  
                    <div className="flex items-center space-x-2 group">
                      <button className="text-purple-400 group-hover:text-purple-300 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                      </button>
                      <span className="text-gray-400 group-hover:text-gray-300">View Bids</span>
                    </div>
                 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">No projects available at this time.</p>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 ${
              currentPage === 1 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            Previous
          </button>

          <span className="text-gray-300 font-medium"> 
            Page {currentPage} of {Math.max(1, Math.ceil(viewProjects.length / projectsPerPage))}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(viewProjects.length / projectsPerPage)))}
            disabled={currentPage >= Math.ceil(viewProjects.length / projectsPerPage) || viewProjects.length === 0}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 ${
              currentPage >= Math.ceil(viewProjects.length / projectsPerPage) || viewProjects.length === 0
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelancerViewProject;