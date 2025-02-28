import React from 'react'
import { Bell, Heart, MessageCircleMore, UserPen } from 'lucide-react'


function Header() {
  return (
    <div>
      <nav className='h-16 bg-avocado-600 w-full '>
        <div className='flex  flex-row w-full bg-amber-50 place-content-between '>
          <p className='  m-[20px] font-bold'>TalentSphere</p>
           <div className='flex flex-row space-x-10 m-4  '>
           <Bell />
           <Heart/>
           <MessageCircleMore/>
           <UserPen/>
           </div>
         
          
          {/* <BellMinus /> */}
          
        </div>

      </nav>
      
    </div>
  )
}

export default Header
