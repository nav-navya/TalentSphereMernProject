

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BidList from '../../pages/Freelancers/BidList'; // Import BidList component

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const ClientProjects = () => {
  const { clientId } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>(
          `http://localhost:5003/api/project/client/${clientId}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [clientId]);

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <h2 className="text-4xl font-bold text-center text-blue-400 mb-8">
        Your Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/20"
          >
            {/* {project.image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )} */}

            <div className="p-5">
              <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>

              <div className="flex justify-end space-x-3 mt-4">
                
                
                <button
                  onClick={() => setSelectedProjectId(project._id)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
                >
                  View Bids
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show Bids if a project is selected */}
      {selectedProjectId && (
        <div className="mt-8 p-6 bg-gray-800 rounded-xl shadow-lg max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedProjectId(null)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-red-700 transition duration-200"
          >
            Close Bids
          </button>
          <BidList projectId={selectedProjectId} />
        </div>
      )}

      {projects.length === 0 && (
        <p className="text-center text-gray-400 mt-8">No projects found for this client.</p>
      )}
    </div>
  );
};

export default ClientProjects;
