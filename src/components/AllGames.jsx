import React from 'react'
import axios from "axios"
import GameCard from './GameCard'
import { toast } from 'react-toastify'
import Select from 'react-select'

export default function AllGames() {

  const [allGames, setAllGames] = React.useState('')
  const [searchBar, setSearchBar] = React.useState('')
  const [dropDownSearch, setDropDownSearch] = React.useState('')
  const [genreData, setGenreData] = React.useState([])



  async function getGames() {
    const games = await axios.get("/api/games")

    return setAllGames(games.data)
  }

  React.useEffect(() => {
    getGames()
    getGenres()
  }, [])

  async function getGenres() {
    try {
      const { data } = await axios.get("/api/genres")
      let genreDataSelect = data.map((genre) => {
        return { value: genre.name, label: genre.name }
      })
      return setGenreData(genreDataSelect)
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message)
    }
  }
  function handleSelectChange(e) {
      setDropDownSearch(e)
  }

  console.log(allGames)

  function handleChange(e) {
    setSearchBar(e.target.value)
  }

  function filterGames() {
    return allGames.filter((game) => {
      
      const nameMatch = game.name.toLowerCase().includes(searchBar.toLowerCase());
      const genreMatch = dropDownSearch.length === 0 || game.genres.some(genre => 
        dropDownSearch.some(genreSearch => genreSearch.value.includes(genre.name))
      );
      return nameMatch && genreMatch;
    });
  }
  
// console.log(dropDownSearch);

  return (
    <>

      <h1 className='text-center font-bold text-5xl mt-4'>All Games</h1>
      <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 
      shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Search game name here..."
        type="text"
        name={'search'}
        onChange={handleChange}
      />
       <Select 
            isMulti
            options={genreData}
            value={dropDownSearch}
            onChange={handleSelectChange}
           />
      {allGames.length > 0 ? <div className='flex flex-wrap items-center gap-5 justify-center py-12 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        {filterGames().map((game, index) =>
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

