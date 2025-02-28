import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../public/login_register.jpg';  // Import your image

// Define interface for form data
interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  
  // State definitions with proper types
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", password: ""
  });
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility state
  const [modalType, setModalType] = useState<string>(""); // Modal type (error or success)

  // Handle form data changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation logic
  const validateForm = (): boolean => {
    // 1. Check if all fields are filled
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return false;
    }
    // 2. Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email");
      return false;
    }
    return true;
  };

  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error, success message
    setMessage(""); 

    if (!validateForm()) {
      setModalType("error"); // Show error modal if validation fails
      setIsModalOpen(true);
      return; // Stop submitting if validation fails
    }

    try {
      const response = await axios.post('http://localhost:5003/api/auth/register', formData);
      setMessage(response.data.message); // Set success message
      setModalType("success"); // Show success modal
      setIsModalOpen(true);

      setTimeout(() => navigate('/'), 2000); // Navigate after 2 seconds
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong"); // Set error message
      setModalType("error"); // Show error modal on API failure
      setIsModalOpen(true);
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-gray-100">
      {/* Modal Notification */}
      {isModalOpen && (
        <div className={`fixed top-0 left-[35%] w-1/4 p-4 text-center z-50 ${modalType === "error" ? 'bg-[#A65F3C]' : 'bg-green-500'} text-white rounded-lg`}>
          <p>{modalType === "error" ? error : message}</p>
          <button
            onClick={closeModal}
            className="bg-white text-green-500 px-3 py-1 rounded-md mt-2 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      )}

      {/* Background Image */}
      <img
        src={loginImage}
        alt="login"
        className="w-[1100px] h-[700px] max-w-none rounded-lg shadow-lg"
      />
      <h2 className='text-amber-900 absolute right-3/4 top-20 font-bold text-xl'>talentSphere</h2>

      {/* Form */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-yellow p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-[#A65F3C] outline-none pb-2"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-[#A65F3C] outline-none pb-2"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-[#A65F3C] outline-none pb-2"
            />
          </div>

          {/* Register Button */}
          <button type="submit" className="bg-[#A65F3C] text-white py-2 rounded hover:bg-[#7B4D36]">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
