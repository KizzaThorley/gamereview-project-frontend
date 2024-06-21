import { Link } from 'react-router-dom'


export default function Home( { isLoggedIn }) {


  let tokenInfo = ""

  if (isLoggedIn) {
    const parts = localStorage.getItem('token').split(".")
    tokenInfo = JSON.parse(atob(parts[1]))
  }


  return (
    <>
  <div className="h-14 bg-opacity-75 w-screen h-screen p-6 bg-center bg-gradient-to-tr bg-[url('https://cdn1.vectorstock.com/i/1000x1000/78/95/seamless-pattern-gamepad-controller-vector-44767895.jpg')]">
<div className='mx-auto w-4/12 px-2 sm:px-6 lg:px-0 just-a-border p-6 text-center items-center justify-center bg-slate-700 rounded-lg '>
      <h1 className=' text-center  text-white font-bold text-5xl'>Game Reviews</h1>
      {isLoggedIn ? <p className='mt-8  text-white text-center m-1'>Welcome back, {tokenInfo.username}. <br></br> Choose what you'd like to do in the navigation bar above!</p> : <p className='mt-8 text-center text-white'>Hello, guest. Sign in <Link to='/login' className='text-yellow-400 underline'>here</Link>, or create an account <Link to='/signup' className='text-yellow-400 underline'>here</Link>!</p>}
      </div>
  </div>
    
    </>
  )
}
