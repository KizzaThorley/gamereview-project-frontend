import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select';
import { toast } from 'react-toastify';
import { baseUrl } from '../config';



export default function Edit() {
  const navigate = useNavigate()

  const { gameId } = useParams()

  async function onFormSubmit(e) {
    e.preventDefault()
    try {
      const newFormData = structuredClone(formData)
      let genresArray = newFormData.genres.map((genre) => {
        return genre.value
      })
      newFormData.genres = genresArray

  
      const token = localStorage.getItem('token')
      await axios.put(`${baseUrl}/games/${gameId}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      navigate('my-games')
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
      toast.error(error.response.data.message)
    }
  }

  async function getGame() {
    try {
      const { data } = await axios.get(`${baseUrl}/games/${gameId}`)
      const newFormData = structuredClone(formData)
      newFormData.name = data.name
      newFormData.year = data.year
      newFormData.imageUrl = data.imageUrl
      newFormData.genres = data.genres.map((genre) => {
        return { value: genre.name, label: genre.name}
      })

      return setFormData(newFormData)
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }

  React.useEffect(() => {
    getGenres()
    getGame()
  }, [])

  // console.log([genreData[0]])
  // console.log(genreData);
  // console.log(formData);

  function handleSelectChange(e) {

    const newFormData = structuredClone(formData)

    newFormData.genres = e

    setFormData(newFormData)
  }

  function handleChange(e) {
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

  console.log(genreData);
  return (
       <div className='mx-auto mt-5  md:container px-10 sm:px-6 lg:px-0 just-a-border p-6 text-center items-center justify-center bg-slate-700 rounded-lg'>
    <div className='container mx-auto px-4 md:container md:mx-auto'>

      <h1 className='text-center font-bold text-5xl text-white mb-4'>Add a game</h1>
      <form onSubmit={onFormSubmit}>
        <div>
          <label className='text-white'>Name:</label>
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
          <label className='text-white'>Year:</label>
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
          <label className='text-white'>Genres:</label>
          <div>
            <Select
              isMulti
              value={formData.genres}
              options={genreData}
              onChange={handleSelectChange}
              />

          </div>
        </div>
        <div>
          <label className='text-white'>Image URL (not required):</label>
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
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">Submit</button>
      </form>
    </div>
    </div>
  )
}
