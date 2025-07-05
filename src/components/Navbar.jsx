import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className=' flex justify-center text-center gap-8 bg-blue-950 text-white font-medium w-full h-10 items-center'>
      
      <NavLink 
        to={"/"}
        className='text-blue-500'
      >
        Home
      </NavLink>

      <NavLink
        to={"/pastes"}
      >
        Paste
      </NavLink>
    </div>
  )
}

export default Navbar
