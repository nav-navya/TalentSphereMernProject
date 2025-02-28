import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import loginImage from '../../public/login_register.jpg'
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string
}

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""

  });

  const [message, setMessage] = useState<String>("");
  const [error, setError] = useState<String>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("")


    try{
      const response = await axios.post("http://localhost:5003/api/auth/login", formData);

      console.log(response.data.token)

      localStorage.setItem("token", response.data.token);

      setMessage("Login Successfull")
      alert("login successfull")
      setTimeout(()=>{navigate('/home')})

    }catch(err:any){
      setError(err.response?.data?.message || "Invalid credentials");
    }
  }
  return (
    <div className="relative w-full flex justify-center items-center h-screen bg-gray-100">
      <img
        src={loginImage}
        alt="login"
        className=" w-auto h-screen rounded-lg shadow-lg object-cover"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white p-8 rounded-lg shadow-lg w-96">
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
          <button type="submit" className="bg-[#863e1b] text-white py-2 rounded hover:bg-[#7B4D36]">
            Login
          </button>
          <p>Don't have an account?
            <Link to="/Register">
              <span className="text-amber-900 hover:underline"> Register Here</span>
            </Link>
          </p>

        </form>



      </div>



    </div>

  )

}

export default Login;