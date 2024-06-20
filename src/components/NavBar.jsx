import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function NavBar({isLoggedIn, setIsLoggedIn}) {
    const location = useLocation()
    const navigate = useNavigate()

// console.log(isLoggedIn)

React.useEffect(() => {
setIsLoggedIn(localStorage.getItem('token'))
}, [location, setIsLoggedIn])

function logout() {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate("/")
}

  return (
    <div className='bg-green-900 shadow p-2'>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex justify-between pb-1 text-center" >
      <Link to="/" className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>Home</Link>
    <Link to="/all-games" className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>All Games</Link>
    {!isLoggedIn && <Link to="/signup" className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>Sign Up</Link>}
    {!isLoggedIn && <Link to="/login" className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>Login</Link>}
    {isLoggedIn && <Link to="/new-game" className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>Add a game</Link>}
    {isLoggedIn && <button className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white' 
    onClick={logout}>Sign Out</button>}
     {isLoggedIn && <Link to="/my-games" className='relative inline-flex items-center 
    justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>My games</Link>}
      </div>
    </div>
  )
}
