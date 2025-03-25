import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define TypeScript interfaces
interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
}

const JobCategory: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch job categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<string[]>("http://localhost:5003/api/project/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch projects based on selected category
  const fetchProjects = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    try {
      const response = await axios.get<Project[]>(
        `http://localhost:5003/api/project/jobs?category=${category}`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle add bid button click
  const handleAddBid = (projectId: string) => {
    console.log(`Adding bid for project: ${projectId}`);
    // Implement your bid logic here
  };

  return (
    <div className="bg-gray-900 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-violet-300">
          Browse Project Categories
        </h2>

        {/* Categories Section - Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => fetchProjects(category)}
              className={`
                cursor-pointer rounded-xl p-4 shadow-md transition-all duration-300
                flex items-center justify-center text-center
                border
                ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-violet-600 to-indigo-700 text-white border-violet-400 transform scale-105"
                    : "bg-gray-800 text-violet-200 border-gray-700 hover:border-violet-500 hover:shadow-lg hover:shadow-violet-900/20"
                }
              `}
            >
              <span className="font-medium">{category}</span>
            </div>
          ))}
        </div>

        {/* Display Jobs Under Selected Category */}
        {selectedCategory && (
          <div className="mt-12 bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-bold text-indigo-300 mb-6 border-b border-gray-700 pb-3">
              {selectedCategory} Projects
            </h3>

            {/* Close Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-4 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
              Close
            </button>

            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-10 w-10 rounded-full bg-violet-900"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-violet-900 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-violet-900 rounded"></div>
                      <div className="h-4 bg-violet-900 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-6">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <div
                      key={project._id}
                      className="border border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-800 hover:bg-gray-750 flex flex-col md:flex-row md:items-center justify-between"
                    >
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-violet-300 mb-2">
                          {project.title}
                        </h4>
                        <p className="text-indigo-200">{project.description}</p>
                        <p className="text-indigo-200 font-bold">${project.budget}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                        <Link to={`/addBid/${project._id}`}>
                          <button
                            onClick={() => handleAddBid(project._id)}
                            className="px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-lg font-medium hover:from-violet-600 hover:to-indigo-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50"
                          >
                            Add Bid
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-indigo-300 text-lg">No projects available in this category.</p>
                    <p className="text-sm text-violet-400 mt-2">
                      Check back later or explore another category.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCategory;

