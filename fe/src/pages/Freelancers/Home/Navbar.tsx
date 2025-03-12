import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="text-white text-2xl font-bold">
          <a href="#">talentSphere</a>
        </div>

       
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } lg:flex space-x-6 text-white`}
        >
          <Link to='/fHome'>
          Home</Link>
           
          
          <Link to='about'> About</Link>
           
         
          <Link  to='fviewProjects' className="hover:text-gray-400">
            View Projects
            </Link>
          <Link to='/profile' className="hover:text-gray-400">
            Profile
          </Link>
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;
