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
    <div id=''>
      <h1>All Games</h1>
      {allGames.map((game, index) => 
        <GameCard key={index} 
        name={game.name}
        imageUrl={game.imageUrl}
        genres={game.genres}
        year={game.year}
        />
      )}

    </div>
    </>
  )
}
