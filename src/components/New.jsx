import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function New() {

  async function onFormSubmit(e) {
    e.preventDefault()
    try {
      await axios.post('/api/games', formData)

      navigate('/my-games')
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate()

  const [formData, setFormData] = React.useState({
    name: '',
    year: '',
    genres: [],
    imageUrl: "",
    reviews: []
  })

  function handleChange(e) {
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

  return (
    <div className='container mx-auto px-4 md:container md:mx-auto'>
      <h1 className='text-xl font-bold text-red-500'>Add a game</h1>
      <form onSubmit={onFormSubmit}>
        <div>
          <label>Name:</label>
          <div>
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 
      shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Add game name here..."
              type="text"
              name={'name'}
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
        </div>
        <div>
          <label>Year:</label>
          <div>
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 
      shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Release year"
              type="text"
              name={'year'}
              onChange={handleChange}
              value={formData.year}
              required
            />
          </div>
        </div>
        <div>
          <label>Genres:</label>
          <div>
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 
      shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Genres"
              type="text"
              name={'genres'}
              onChange={handleChange}
              value={formData.genres}
              required
            />
          </div>
        </div>
        <div>
          <label>Image URL (not required):</label>
          <div>
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 
      shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Image URL"
              type="text"
              name={'imageUrl'}
              onChange={handleChange}
              value={formData.imageUrl}
              required
            />
          </div>
        </div>
        <button className="rounded-md p-2 text-gray-400 bg-blue-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">Submit</button>
      </form>
    </div>
  )
}
