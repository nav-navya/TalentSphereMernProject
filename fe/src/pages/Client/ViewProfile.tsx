import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, User, Mail, Edit, ChevronRight, Shield } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface User {
  name: string;
  email: string;
  profilePic: string;
}

const CProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); 

        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5003/api/userProfile/profile", {
          headers: { Authorization: `Bearer ${token}` }, 
        });

        setUser(response.data); 
        setLoading(false);

      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 inline-block mb-4">Your Profile</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        
        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-300">Loading your profile...</p>
          </div>
        ) : (
          user && (
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 shadow-xl">
              {/* Profile Header with Background */}
              <div className="h-32 bg-gradient-to-r from-purple-600/30 to-pink-600/30 relative">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-md opacity-70"></div>
                    <div className="relative w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden">
                      <img 
                        src={user.profilePic || "https://via.placeholder.com/150"} 
                        className="w-full h-full object-cover" 
                        alt={user.name}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="pt-20 px-6 pb-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-1">{user.name}</h3>
                  <p className="text-gray-400">Freelance Client</p>
                </div>
                
                {/* User Info Cards */}
                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-gray-800/50 rounded-lg flex items-center">
                    <User className="text-purple-400 mr-4" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Full Name</p>
                      <p className="text-white">{user.name}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg flex items-center">
                    <Mail className="text-purple-400 mr-4" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Email Address</p>
                      <p className="text-white">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg flex items-center">
                    <Shield className="text-purple-400 mr-4" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Account Status</p>
                      <p className="text-white">Verified</p>
                    </div>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link to='/addmoreDetails' className="flex-1">
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50">
                      <Edit size={18} />
                      <span>Complete Profile</span>
                      <ChevronRight size={18} />
                    </button>
                  </Link>
                  
                  <button 
                    onClick={handleLogout} 
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                  >
                    <LogOut size={18} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CProfile;