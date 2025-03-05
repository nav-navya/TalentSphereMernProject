import React from 'react';
import Navbar from '../../Freelancers/Home/Navbar'

const Main = () => {
  return (
 
     
    <div className=" w-full  bg-black">
      <nav>
        <Navbar/>
      </nav>
    <div className='flex justify-start items-center'>
      <div className='w-[100vh] object-fill h-full ' >
       <img src="Home.jpg"/>
      </div>
    </div>
      
    </div>
   
  );
};

export default Main;
