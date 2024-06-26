import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Slide, toast } from 'react-toastify'
import { baseUrl } from '../config'

export default function Signup() {

    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    async function onFormSubmit(e) {
        e.preventDefault()
        try {
            await axios.post(`${baseUrl}/signup`, formData)

            navigate('/login')
        } catch (error) {
            if (error.response.data.username) {
                toast.error(error.response.data.username, {
                    autoClose: 3000,
                    transition: Slide
                });
            } else if (error.response.data.email) {
                toast.error(error.response.data.email, {
                    autoClose: 3000,
                    transition: Slide
                });
            } else {
                toast.error(error.response.data.message, {
                    autoClose: 3000,
                    transition: Slide
                });
            }
        }
    }
    // console.log(formData);


    return (
        <div className='mx-auto mt-5  md:container px-10 sm:px-6 lg:px-0 just-a-border p-6 text-center items-center justify-center bg-slate-700 rounded-lg ' >

        <div className='container mx-auto px-4 md:container md:mx-auto flex-wrap justify-center items-center'>
            <h1 className='text-center font-bold text-5xl text-white mb-4'>Sign Up</h1>
            <form onSubmit={onFormSubmit}>
                <div>
                    <label className='text-white'>Username</label>
                    <div>
                        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 
              shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Username"
              type="text"
              name={'username'}
              onChange={handleChange}
              value={formData.username}
              required
              />
                    </div>
                </div>
                <div>
                    <label className='text-white'>Email</label>
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
                    <label className='text-white '>Password</label>
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
                </div>
                <div>
                    <label className='text-white'>Password Confirmation</label>
                    <div>
                        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 
              shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Password Confirmation"
              type="password"
              name={'passwordConfirmation'}
              onChange={handleChange}
              value={formData.passwordConfirmation}
              required
              />
                        <button className="rounded-md p-2 text-gray-400 bg-green-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white text-center m-4 justify-center items-center">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}
