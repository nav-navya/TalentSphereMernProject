import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define TypeScript interface for project structure
interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
}

const AllProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Project[]>(
          "http://localhost:5003/api/project/getprojects"
        );
        setProjects(response.data);
      } catch (err) {
        setError("Failed to fetch projects. Please try again later.");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-violet-300">
          Explore All Projects
        </h2>

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-violet-500"></div>
          </div>
        )}

        {error && (
          <div className="text-red-400 text-center mb-6">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project._id}
                  className="border border-gray-700 rounded-lg p-5 shadow-md bg-gray-800 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-violet-300">
                    {project.title}
                  </h3>
                  <p className="text-indigo-200 mt-2 line-clamp-3">
                    {project.description}
                  </p>
                  <p className="text-indigo-400 font-bold mt-2">
                    Budget: ${project.budget}
                  </p>
                  <p className="text-indigo-500 text-sm mt-1">
                    Category: {project.category}
                  </p>

                  <div className="mt-4">
                    <Link to={`/project/${project._id}`}>
                      <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-lg font-medium hover:from-violet-600 hover:to-indigo-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-indigo-300 text-lg">
                  No projects available at the moment.
                </p>
                <p className="text-sm text-violet-400 mt-2">
                  Check back later or explore other sections.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
