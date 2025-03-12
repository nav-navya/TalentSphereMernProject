import React from 'react';
import Navbar from '../../Freelancers/Home/Navbar'
import JobCategory from '../../../Components/Freelancer/JobCategory';
import About from '../About';
import Footer from './Footer';

const Main = () => {
  return (
 
     
    <div className=" w-full  bg-black">
      <nav>
        {/* <Navbar/> */}
      </nav>
    <div className='flex justify-start items-center'>
      <div className='w-[100vh] object-fill h-full ' >
       <img src="Home.jpg"/>
      </div>
    </div>
    <JobCategory/>
    <About/>
    <Footer/>
      
    </div>
   
  );
};

export default Main;
