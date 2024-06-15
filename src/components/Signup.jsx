import React from 'react'

export default function Signup() {



  return (
    <div className='container mx-auto px-4 md:container md:mx-auto'>
      <h1 className='text-xl font-bold text-red-500'>tailwind css test</h1>
          <div>
            <label>Username</label>
            <div>
              <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 
              shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
              placeholder="Username"
        
                type="text"
                name={'username'}
                required 
              />
            </div>
          </div>
          <div>
            <label>Email</label>
            <div>
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 
              shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
              placeholder="example@example.com"
                type="text"
                name={'email'}
                required 
              />
            </div>
          </div>
          <div>
          <label>Password</label>
            <div>
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 
              shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
              placeholder="Password"
                type="password"
                name={'password'}
                required 
              />
            </div>
          </div>
          <div>
          <label>Password Confirmation</label>
            <div>
              <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 
              shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
              placeholder="Password Confirmation"
                type="password"
                name={'passwordConfirmation'}
                required 
              />
            </div>
          </div>
    </div>
  )
}
