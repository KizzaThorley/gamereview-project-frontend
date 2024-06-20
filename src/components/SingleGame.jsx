import React from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Slide, toast } from 'react-toastify'
import ReviewCard from './ReviewCard'
import EditReview from './EditReview'

export default function SingleGame({ isLoggedIn }) {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = React.useState(null)
  const [editMode, setEditMode] = React.useState(false)
  const [review, setReview] = React.useState({
    review: "",
    rating: 0,
    addedBy: ""
  })

  let user = null

  const token = isLoggedIn
  if (token) {
    user = JSON.parse(atob(token.split(".")[1]))
  }

  async function getGame() {
    try {
      const { data } = await axios.get(`/api/games/${gameId}`)
      console.log(data)
      setGame(data)
    } catch (error) {
      toast.error(error)
    }
  }

  React.useEffect(() => {
    getGame()
    reviewUserIDs()
  }, [])

  function changeRating(event) {
    const newReview = structuredClone(review)
    newReview.rating = Number(event.target.id)
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
      const { data } = await axios.post(`/api/games/${gameId}/reviews`, review, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setGame(data)
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 3000,
        transition: Slide
      })
    }
  }

  async function reviewUserIDs() {
    await game?.reviews.map((review) => {
       return review.addedBy
    })
  }



  function searchReviews() {
    return game.reviews.filter((review) => {
      return (user._id === review.addedBy)
    })
  }

  // const hasReviewed = searchReviews()

  return (
    <>
      {!game ? (
        <h1 className='text-left font-bold text-5xl mt-5 ml-5'>Loading...</h1>
      ) : (
        <>
          <div className='object-center w-fit bg-green-100 m-5 p-5 rounded-xl border-4 border-green-900'>
            <h1 className='text-left font-bold text-5xl mb-5 uppercase'>{game.name} ({game.year})</h1>
            <div className="object-center flex justify-center">
              {game.imageUrl && (
                <img src={game.imageUrl} className='min-w-96 max-w-3xl border-teal-900 rounded-xl border-2 mb-2' />
              )}
            </div>
            <p className='capitalize text-xl'>
              <span className='font-bold'>Genres: </span>
              {game.genres.map((genre, index) => (
                index === game.genres.length - 1 ? (
                  <span key={index}>{genre.name}</span>
                ) : (
                  <span key={index}>{genre.name}, </span>
                )
              ))}
            </p>
          </div>
          <div className='object-center w-fit bg-teal-100 m-5 p-5 rounded-xl border-4 border-teal-800 flex-col'>
            <h1 className="text-left font-bold text-5xl mb-5">Reviews</h1>
            {game.reviews.length > 0 ? (
              <>
                {game.reviews.map((review, index) => {
                  const stars = []
                  for (let i = 0; i < review.rating; i++) {
                    stars.push("⭐")
                  }
                  return (
                    <div key={index}>
                      {user && user._id === review.addedBy ? (
                        <>
                          {!editMode && <div className='flex flex-row'>
                            {stars.map((star, index) => <p key={"star" + index}>{star}</p>)}
                          </div>}
                          {!editMode && <p>{review.review}</p>}
                          <div className='flex flex-column justify-between mr-8 mb-6'>
                            <>
                              <div>
                                {editMode && (
                                  <EditReview
                                    isLoggedIn={isLoggedIn}
                                    postReview={postReview}
                                    changeRating={changeRating}
                                    handleChange={handleChange}
                                    review={review}
                                  />
                                )
                                }
                              </div>
                              <button
                                className='mt-6 mb-1 border-teal-900 border-2 w-fit py-1 px-3 rounded-lg self-center text-96 bg-teal-400'
                                onClick={(event) => {
                                  setEditMode(!editMode)
                                  event.target.innerHTML = editMode ? "Edit" : "Confirm"
                                }}
                              >
                                Edit
                              </button>
                              {!editMode && (
                                <button className='mt-6 mb-1 border-teal-900 border-2 w-fit py-1 px-3 rounded-lg self-center text-96 bg-teal-400'>
                                  Delete
                                </button>
                              )}
                            </>
                          </div>
                        </>
                      ) : (

                        <>
                          <div className='flex flex-row'>
                            {!editMode && stars.map((star, index) => <p key={"star" + index}>{star}</p>)}
                          </div>
                          <p>{!editMode && review.review}</p>
                        </>

                      )}
                    </div>
                  )
                })}
              </>
            ) : (
              <p>Nobody's written a review for this game yet... fancy being the first?</p>
            )}
          </div>
          {/* {(game.reviews.length > 0 && searchReviews()) ? <p>You've already reviewed this.</p>
            : */}
            <ReviewCard
              isLoggedIn={isLoggedIn}
              postReview={postReview}
              changeRating={changeRating}
              handleChange={handleChange}

            />
          {/* } */}
        </>
      )}
    </>
  )
}

