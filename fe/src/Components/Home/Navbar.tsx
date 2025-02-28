import React from 'react'
import { Bell, Heart, MessageCircleMore, UserPen } from 'lucide-react'
import { Link } from 'react-router-dom'




const Navbar = () => {

  return (
   <header>
    <div>
      <nav className='h-16 bg-avocado-600 w-full '>
        <div className='flex  flex-row w-full bg-amber-50 place-content-between '>
          <p className='  m-[20px] font-bold'>TalentSphere</p>
           <div className=' cursor-pointer flex flex-row space-x-10 m-4  '>
           <Bell />
           <Heart/>
           <MessageCircleMore/>
           <Link to='/profile'>
           <UserPen/>
           </Link>
          
           </div> 
        </div>
      </nav>
    </div>
   </header>
  )
}

export default Navbar