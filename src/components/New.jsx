import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select';
import { toast } from 'react-toastify';
import { baseUrl } from '../config';



export default function New() {
  const navigate = useNavigate()

  async function onFormSubmit(e) {
    e.preventDefault()
    try {
        const newFormData = structuredClone(formData)
      let genresArray = newFormData.genres.map((genre) => {
        return genre.value
      })
      newFormData.genres = genresArray

      const token = localStorage.getItem('token')
      await axios.post(`${baseUrl}/games`, newFormData, { 
        headers: { Authorization: `Bearer ${token}` }
      })

      navigate('/my-games')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }



  const [formData, setFormData] = React.useState({
    name: '',
    year: '',
    genres: [],
    imageUrl: "",
  })
  const [genreData, setGenreData] = React.useState([])

  async function getGenres() {
    try {
      const { data } = await axios.get(`${baseUrl}/genres`)
      let genreDataSelect = data.map((genre) => {
        return { value: genre.name, label: genre.name }
      })

      return setGenreData(genreDataSelect)
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message)
    }

    }
  
    React.useEffect(() => {
      getGenres()
    }, [])
  
function handleSelectChange(e) {
  const newFormData = structuredClone(formData)
    newFormData.genres = e

    setFormData(newFormData)
}

// console.log(formData);  

  function handleChange(e) {
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

  return (
    <div className='container mx-auto px-4 md:container md:mx-auto'>
      <h1 className='text-xl font-bold text-red-500 text-center m-4'>Add a game</h1>
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
           <Select 
            isMulti
            options={genreData}
            value={formData.genres}
            onChange={handleSelectChange}
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
              
            />
          </div>
        </div>
        <button className="rounded-md p-2 text-gray-400 bg-blue-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white text-center m-4 justify-center items-center">Submit</button>
      </form>
    </div>
  )
}
