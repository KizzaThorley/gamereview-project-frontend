import React from 'react'

export default function GameCard({ name, imageUrl, year, genres }) {

    return (
        <div className='flex mx-auto w-fit px-2 sm:px-6 lg:px-8'>
            <div className='flex mx-auto w-4/12 px-2 sm:px-6 lg:px-0'>
                <h1>{name} ({year})</h1>
                <div className='flex mx-auto w-fit px-2 sm:px-6 lg:px-0'>
                    <img className="size-fit" src={imageUrl} alt={"An image of the game " + name}></img>
                </div>
                <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                    {genres.map((genre, index) => {
                        if (index === (genres.length - 1)) {
                            return <span key={index}>{genre.name}</span>
                        } else {
                            return <span key={index}>{genre.name}, </span>
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
