import React from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SingleGame({ isLoggedIn }) {
  const { gameId } = useParams()
  const [game, setGame] = React.useState(null)
  const [reviewRating, setReviewRating] = React.useState(0)
  const [review, setReview] = React.useState({
    review: "",
    rating: reviewRating,
    addedBy: ""
  })

  async function getGame() {
    try {

      const { data } = await axios.get(`/api/games/${gameId}`)
      return setGame(data)

    } catch (error) {
      toast.error(error)
    }
  }

  React.useEffect(() => {
    getGame()
  }, [])

  function changeRating(event) {
    const newReview = structuredClone(review)
    setReviewRating(event.target.id)
    newReview.rating = Number(reviewRating)
    setReview(newReview)

    for (let i = 5; i > 0; i--) {
      const button = document.getElementById(i)
      button.classList.add("opacity-40")
    }
    for (let i = event.target.id; i > 0; i--) {
      const button = document.getElementById(i)
      button.classList.remove("opacity-40")
    }
  }

  function handleChange(e) {
    const newReview = structuredClone(review)
    newReview[e.target.name] = e.target.value
    setReview(newReview)
  }

  async function postReview(event) {
    event.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const parts = token.split(".")
      const user = JSON.parse(atob(parts[1]))

      const newReview = structuredClone(review)
      newReview.addedBy = user._id
      setReview(newReview)

      // await axios.post("")
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <>
      {!game ? <h1 className='text-left font-bold text-5xl mt-5 ml-5'>Loading...</h1> :
        <>
          <div className='object-center w-fit bg-green-100 m-5 p-5 rounded-xl border-4 border-green-900'>
            <h1 className='text-left font-bold text-5xl mb-5 uppercase'>{game.name} ({game.year})</h1>
            <div className="object-center flex justify-center">
              {game.imageUrl && <img src={game.imageUrl} className='min-w-96 max-w-3xl border-teal-900 rounded-xl border-2 mb-2' />}
            </div>
            <p className='capitalize text-xl'><span className='font-bold'>Genres: </span>{game.genres.map((genre, index) => {
              return (index === game.genres.length - 1) ? <span key={index}>{genre.name}</span> : <span key={index}>{genre.name}, </span>
            }
            )}
            </p>
          </div>
          <div className='object-center w-fit bg-teal-100 m-5 p-5 rounded-xl border-4 border-teal-800'>
            <h1 className="text-left font-bold text-5xl mb-5">Reviews</h1>
            {game.reviews.length > 0 
             ? 
             <>
             {game.reviews.map((review, index) => {
              <>
              <p key={index}>{review.review}</p>
              </>
              })}
             </>
             : <p>Nobody's written a review for this game yet... fancy being the first?</p>
            }
          </div>
          <div className='object-center w-fit bg-blue-100 m-5 p-5 rounded-xl border-4 border-blue-900'>
            {isLoggedIn
            ? <>
            <h1 className='text-left font-bold text-5xl mb-5'>Add a review</h1>
            <form className='flex flex-col' onSubmit={postReview}>
              <div className='mb-5'>
              <label htmlFor='rating' className='text-2xl'>Rating: </label>
              <input type='button' name='rating' id='1' value=" ⭐" required className='cursor-pointer text-4xl opacity-40' key="1" onClick={changeRating}/>
              <input type='button' name='rating' id='2' value="⭐" required className='cursor-pointer text-4xl opacity-40' key="2" onClick={changeRating}/>
              <input type='button' name='rating' id='3' value="⭐" required className='cursor-pointer text-4xl opacity-40' key="3" onClick={changeRating}/>
              <input type='button' name='rating' id='4' value="⭐" required className='cursor-pointer text-4xl opacity-40' key="4" onClick={changeRating}/>
              <input type='button' name='rating' id='5' value="⭐" required className='cursor-pointer text-4xl opacity-40' key="5" onClick={changeRating}/>
              </div>
              <label htmlFor='review' className='text-2xl mb-2'>Review: </label>
              <textarea name='review' id='review' rows="9" cols="50" onChange={handleChange} className='p-2 border-blue-900 border-2 rounded-xl bg-gray-100'/>
              <div className='flex justify-center items-center'>
                <button className='mt-6 mb-1 border-blue-900 border-4 w-fit py-3 px-6 rounded-lg self-center text-xl bg-blue-400'>Submit</button>
              </div>
            </form>
            </>
            : <>
            <h1 className='text-left font-bold text-5xl mb-5'>Add a re- wait a minute!</h1>
            <p>You're not signed in... change that <Link to="/login" className='text-blue-600 underline'>here</Link>, or sign up <Link to="/signup" className='text-blue-600 underline'>here</Link>!</p>
            </>
            }
          </div>
        </>
      }
    </>
  )

}
