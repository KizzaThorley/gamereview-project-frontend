import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Slide, toast } from 'react-toastify'

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
            await axios.post('/api/signup', formData)

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
        <div className='container mx-auto px-4 md:container md:mx-auto'>
            <h1 className='text-xl font-bold text-red-500'>Sign Up</h1>
            <form onSubmit={onFormSubmit}>
                <div>
                    <label>Username</label>
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
                </div>
                <div>
                    <label>Password Confirmation</label>
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
                        <button className="rounded-md p-2 text-gray-400 bg-blue-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
