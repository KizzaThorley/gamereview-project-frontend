// import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='bg-emerald-800'>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" >
        <Link to="/signup" className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>SignUp</Link>
        <Link to="/" className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>Home</Link>
      </div>
    </div>
  )
}
