import React from 'react'
import axios from "axios"

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
    <div>
      <h1>All Games</h1>
      {allGames.map((game, index) => 
        <div key={index}>
          <h4>{game.name}</h4>
        </div>
      )}

    </div>
  )
}
