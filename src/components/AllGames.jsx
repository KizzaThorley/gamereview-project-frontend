import React from 'react'
import axios from "axios"
import GameCard from './GameCard'

export default function AllGames() {

  const [allGames, setAllGames] = React.useState([])


  async function getGames() {
  const games = await axios.get("/api/games")
  
  return setAllGames(games.data)
  }

  React.useEffect(() => {
    getGames()
  }, [])

  console.log(allGames)



  return (
    <>
   
      <h1 className='text-center font-bold text-5xl mt-4'>All Games</h1>
      {allGames.length > 0 ? <div className='flex flex-wrap items-center gap-5 justify-center py-12 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
      {allGames.map((game, index) => 
        <GameCard key={index} 
        name={game.name}
        imageUrl={game.imageUrl}
        genres={game.genres}
        year={game.year}
        gameId={game._id}
        />
      )}
      </div>
      : <h1 className='text-center font-bold text-7xl mt-8'>Loading...</h1>
      }

  
    </>
  )
}
