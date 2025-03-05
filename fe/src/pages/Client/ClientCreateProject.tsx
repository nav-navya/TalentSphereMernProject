
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  title: string;
  description: string;
  budget: number | string;
  skills: string;
  category: string;
  image: string | File;
}

// Predefined categories
const categories = [
  "Web development", "Graphic design", "Content writing", "Logo design", "AI services", 
  "Digital marketing", "Music", "Art", "others"
];

const CreateProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    budget: "",
    skills: "",
    category: categories[0], // Default to the first category
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
  
    if (name === "image" && files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],  // Ensure only the first file is taken
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "budget" ? parseFloat(value) || "" : value,
      }));
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage!");
      setLoading(false);
      return;
    }

    const projectData = new FormData();
    projectData.append("title", formData.title);
    projectData.append("description", formData.description);
    projectData.append("budget", formData.budget.toString());
    projectData.append("skills", formData.skills);
    projectData.append("category", formData.category);
    if (formData.image instanceof File) {
      projectData.append("image", formData.image); // Appending the image file
    }

    try {
      const response = await axios.post(
        "http://localhost:5003/api/project/create",
        projectData, // Send FormData here
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // This header is important when sending FormData
          },
        }
      ); 
      console.log("Full response", response);
      alert("Project created successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error creating Project", error);
      setError("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950">
      <div className="bg-white p-8 w-full max-w-2xl rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create a New Project
        </h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title and Budget Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-500 mb-2">
                Project Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 bg-gray-200"
                required
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-500 mb-2">
                Budget
              </label>
              <input
                id="budget"
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-3 bg-gray-200"
                required
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-500 mb-2">
              Project Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200"
              rows={4}
              required
            ></textarea>
          </div>

          {/* Category Dropdown and Skills Field */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-500 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 bg-gray-200"
                required
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-500 mb-2">
                Skills
              </label>
              <input
                id="skills"
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-3 bg-gray-200"
                required
              />
            </div>
          </div>

          {/* Project Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-500 mb-2">
              Project Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              className="w-full p-3 bg-gray-200"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-900 text-white hover:bg-blue-800"
            disabled={loading}
          >
            {loading ? "Creating..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
