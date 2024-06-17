import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
    const location = useLocation()

const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('token'))

React.useEffect(() => {
setIsLoggedIn(localStorage.getItem('token'))
}, [location])

function logout() {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
}

  return (
    <div className='bg-emerald-800'>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" >
      <Link to="/" className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>Home</Link>
    {!isLoggedIn && <Link to="/signup" className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>Sign Up</Link>}
    {!isLoggedIn && <Link to="/login" className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>Login</Link>}
    {isLoggedIn && <Link to="/new-game" className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>Add a game</Link>}
    {isLoggedIn && <button className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white' 
    onClick={logout}>Sign Out</button>}
      </div>
    </div>
  )
}
