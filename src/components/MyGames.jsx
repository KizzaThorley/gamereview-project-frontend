import React from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import GameCard from './GameCard'

export default function MyGames() {

  // const navigate = useNavigate()

  const [usersGames, setUsersGames] = React.useState([])

  React.useEffect(() => {
    async function fetchMyGames() {
      const token = localStorage.getItem('token')
      const { data } = await axios.get('/api/my-games', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsersGames(data)

    }
    fetchMyGames()
  }, [])


  // console.log(usersGames);
  return (
    <>
      <h1 className='text-center font-bold text-5xl mt-4'>My Games</h1>
      <div className='flex flex-wrap items-center gap-5 justify-center py-12 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>

        {(usersGames.length > 0) ? usersGames.map((game, index) => {
          return <GameCard
            key={index}
            name={game.name}
            imageUrl={game.imageUrl}
            genres={game.genres}
            year={game.year}
          />
        }) : <Link to='/new-game' className='relative inline-flex items-center 
  justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 
  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>Add a game</Link>}

      </div>
    </>
  )
}
