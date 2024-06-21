import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link, } from 'react-router-dom'
import GameCard from './GameCard'
import { toast } from 'react-toastify'
import { baseUrl } from '../config'

export default function MyGames() {

  const navigate = useNavigate()

  const [usersGames, setUsersGames] = React.useState([])

  async function fetchMyGames() {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(`${baseUrl}/my-games`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsersGames(data)
    } catch (error) {
      toast(error.response.data.message)
    }


  }

  React.useEffect(() => {
    fetchMyGames()
  }, [])

  async function handleDelete(gameId) {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.delete(`${baseUrl}/games/${gameId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data);
      fetchMyGames()
    } catch (error) {
      toast(error.response.data.message)
    }

  }


  // console.log(usersGames);
  return (
    <>
      <h1 className='text-center font-bold text-5xl mt-4'>My Games</h1>
      <div className='flex grid-cols-2 flex-wrap items-center gap-5 justify-center py-12 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>

        {(usersGames.length > 0) ? usersGames.map((game, index) => {
          return <div className=' bg-slate-700 rounded-lg' 
          key={index}>
            <GameCard
              key={index}
              name={game.name}
              imageUrl={game.imageUrl}
              genres={game.genres}
              year={game.year}
              gameId={game._id}
            />
            <div className='flex '>
              <button onClick={() => handleDelete(game._id)} className='relative  items-center 
    justify-center rounded-md p-2 text-gray-400 hover:bg-red-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white w-48 h-28 border-black border'>
                Delete <span className='uppercase'>{game.name}</span></button>
              <button onClick={() => navigate(`/my-games/edit/${game._id}`)} className='relative  items-center 
    justify-center rounded-md p-2 text-gray-400 hover:bg-green-700 
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white w-48 h-28 border-black border'>
                Edit <span className='uppercase'>{game.name}</span></button>
            </div>
          </div>
        }) : <Link to='/new-game' className='relative inline-flex items-center 
  justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 
  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>Add a game</Link>
        }

      </div>
    </>
  )
}
