import React from 'react'
import { Link } from 'react-router-dom'

export default function GameCard({ name, imageUrl, year, genres, gameId }) {

    return (
        // <div className='flex flex-wrap flex-nowrap items-center gap-5 justify-center py-12'>
        <Link to={`/game/${gameId}`} className='flex flex-wrap mx-auto w-4/12 px-2 sm:px-6 lg:px-0 just-a-border h-full p-6 text-center
        items-center justify-center bg-slate-700 rounded-lg h-96'>
            <h1 className='mb-3.5 text-xl font-bold uppercase'>{name} ({year})</h1>
            <div className='flex mx-auto w-fit px-2 sm:px-6 lg:px-0'>
                <img className="size-fit mb-3.5" src={imageUrl} alt={"An image of the game " + name}></img>
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
        // </div>

    )
}
