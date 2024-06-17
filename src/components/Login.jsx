import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = React.useState({

    email: '',
    password: '',
  })

  function handleChange(e) {
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

  async function onFormSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)

      const token = data.token

      localStorage.setItem('token', token)

      console.log('login successful');

      navigate('/')
    } catch (error) {
      console.log(error.response.data.message);
    }


  }
  // console.log(formData);


  return (
    <div>
      <div className='container mx-auto px-4 md:container md:mx-auto'>
        <h1 className='text-xl font-bold text-red-500'>Login</h1>
        <form onSubmit={onFormSubmit}>
          <div>
            <label>Email</label>
            <div>
              <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 
              shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="example@example.com"
                type="text"
                name={'email'}
                onChange={handleChange}
                value={formData.email}
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
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
            <div>
              <button className="rounded-md p-2 text-gray-400 bg-blue-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
