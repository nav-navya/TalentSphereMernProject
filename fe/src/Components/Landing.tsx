import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  
  const handleRoleSelection = (role: string) => {
    localStorage.setItem('role', role);
    
    if (role === 'client') {
      navigate('/home'); 
    } else if (role === 'freelancer') {
      navigate('/fHome'); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Abstract shapes in background */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      {/* Main content */}
      <div className="relative z-10 text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">TalentSphere</h1>
        <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-8">Connect with top talent or find your perfect project. Your freelancing journey starts here.</p>
      </div>
      
     
      <div className="relative z-10 flex flex-col md:flex-row gap-6 w-full max-w-xl justify-center">
        <button
          onClick={() => handleRoleSelection('client')}
          className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
        >
          Hire Freelancers
        </button>
        
        <button
          onClick={() => handleRoleSelection('freelancer')}
          className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
        >
          Find Work
        </button>
      </div>
      
      {/* Additional info */}
      
    </div>
  );
};

export default Landing;