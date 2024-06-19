import React from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function Home( { isLoggedIn }) {


  let tokenInfo = ""

  if (isLoggedIn) {
    const parts = localStorage.getItem('token').split(".")
    tokenInfo = JSON.parse(atob(parts[1]))
  }


  return (
    <>
      <h1 className='text-center font-bold text-5xl mt-4'>Game Reviews</h1>
      {isLoggedIn ? <p className='mt-8 text-center'>Welcome back, {tokenInfo.username}. Choose what you'd like to do in the navigation bar above!</p> : <p className='mt-8 text-center'>Hello, guest. Sign in <Link to='/login' className='text-blue-600 underline'>here</Link>, or create an account <Link to='/signup' className='text-blue-600 underline'>here</Link>!</p>}
   
    </>
  )
}
