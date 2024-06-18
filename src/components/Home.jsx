import React from 'react'
import { Link } from 'react-router-dom'


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('token'))

  React.useEffect(() => {
    setIsLoggedIn(localStorage.getItem('token'))
  }, [])

  let tokenInfo = ""

  if (isLoggedIn) {
    const parts = localStorage.getItem('token').split(".")
    tokenInfo = JSON.parse(atob(parts[1]))
  }

  console.log(tokenInfo)

  return (
    <>
      <h1 className='text-center font-bold text-5xl mt-4'>Game Reviews</h1>
      {isLoggedIn ? <p className='mt-8 text-center'>Welcome back, {tokenInfo.username}. Choose what you'd like to do in the navigation bar above!</p> : <p className='mt-8 text-center'>Hello, guest. Sign in <Link to='/login' className='text-blue-600 underline'>here</Link>, or create an account <Link to='/signup' className='text-blue-600 underline'>here</Link>!</p>}
      <></>
    </>
  )
}
