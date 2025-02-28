import { useState } from "react";
import axios from "axios";
import loginImage from "../../public/login_register.jpg";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5003/api/auth/login", formData);
      setMessage("Login successful! ✅"); // Show success message
      // localStorage.setItem("token", response.data.token); // Store JWT token
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-red-100">
      <img src={loginImage} alt="login" className=" w-full rounded-lg shadow-lg" /> 

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      bg-black p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {/* Success & Error Messages */}
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 focus:border-[#A65F3C] outline-none pb-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 focus:border-[#A65F3C] outline-none pb-2"
            required
          />
          <button type="submit" className="bg-[#A65F3C] text-white py-2 rounded hover:bg-[#7B4D36]">
            Login
          </button>
          <p>Don't have an account?<Link to="/Register"><span className="text-amber-900 hover:underline" > Register Here</span></Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;


