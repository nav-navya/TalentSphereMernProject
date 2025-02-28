import React from 'react'
import { Link } from 'react-router-dom';


const MainSection = () => {
  return (


    <div>

<div className='w-full h-[60vh] relative'>
      <img src='idk.webp' className='w-full h-full object-cover' />

      <div className='absolute top-24 flex justify-center w-full '>
      <input type='text' placeholder='  Search Freelancers ' className='bg-white w-1/4 h-12 rounded-4xl border-2 border-gray-400 active:border-none' />
      </div>
      

      <div className='absolute bottom-0 w-full flex flex-row justify-around'>
        <Link to='/createProject'>
        <button className="w-76 h-16 bg-white border-1 border-gray-400 text-black py-4 px-4 rounded-2xl hover:bg-gray-100 transform translate-y-1/2">
          Post a project brief
        </button>
        </Link>
        <button className="w-76 h-16 bg-white border-1 border-gray-400 text-black py-4 px-4 rounded-2xl hover:bg-gray-100 transform translate-y-1/2">
          Start Messaging
        </button>
        <button className="w-76 h-16 bg-white border-1 border-gray-400 text-black py-4 px-4 rounded-2xl hover:bg-gray-100 transform translate-y-1/2">
          Buisiness Recommentations
        </button>
      </div>
    </div>


    </div>
  )
}

export default MainSection;