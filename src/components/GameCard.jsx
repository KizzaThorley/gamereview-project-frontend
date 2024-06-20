// import React from 'react'
import { Link } from 'react-router-dom'

export default function GameCard({ name, imageUrl, year, genres, gameId }) {

    return (
        <div className='flex flex-wrap mx-auto w-4/12 px-2 sm:px-6 lg:px-0 just-a-border h-full p-6 text-center items-center justify-center bg-slate-700 w-96 h-96 rounded-lg aspect-square 
        '>
            <Link to={`/game/${gameId}`}>
                <h1 className='mb-3.5 text-xl font-bold uppercase'>{name} ({year})</h1>
                <div className='flex mx-auto w-fit px-2 sm:px-6 lg:px-0'>
                   {imageUrl ?  <img className="size-fit mb-3.5" src={imageUrl} alt={"An image of the game " + name}></img>: <p>No Image Added Yet</p>} 
                </div>
                <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                    {genres.map((genre, index) => {
                        if (index === (genres.length - 1)) {
                            return <span className='mb-2 text-sm font-medium capitalize' key={index}>{genre.name}</span>
                        } else {
                            return <span className='mb-2 text-sm font-medium capitalize' key={index}>{genre.name}, </span>
                        }
                    })}
                </div>
            </Link>
        </div>

    )
}
