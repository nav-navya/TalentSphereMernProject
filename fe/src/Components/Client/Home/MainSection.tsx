import React from 'react';
import { Link } from 'react-router-dom';

const MainSection = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center overflow-hidden">
      {/* Background Image */}
      <div className="w-full h-3/4 relative"> {/* Full width & half height */}
        <img 
          src="5.jpg" 
          className="w-full h-full object-cover" // Ensures full width and proper fit
          alt="Freelancer Platform"
        />

        {/* Search Bar */}
        <div className="absolute top-1/4 flex justify-center w-full">
          <input 
            type="text" 
            placeholder="Search Freelancers" 
            className="bg-white w-1/4 h-12 rounded-4xl border-2 border-gray-400 px-4 outline-none"
          />
        </div>
      </div>

      {/* Buttons Section */}
      <div className="w-full flex justify-center gap-6 mt-6">
        <Link to="/createProject">
          <button className="w-60 h-16 bg-white border border-gray-400 text-black py-4 px-4 rounded-2xl hover:bg-gray-100">
            Post a project brief
          </button>
        </Link>
        <button className="w-60 h-16 bg-white border border-gray-400 text-black py-4 px-4 rounded-2xl hover:bg-gray-100">
          Start Messaging
        </button>
        <button className="w-60 h-16 bg-white border border-gray-400 text-black py-4 px-4 rounded-2xl hover:bg-gray-100">
          Business Recommendations
        </button>
      </div>
    </div>
  );
};

export default MainSection;
