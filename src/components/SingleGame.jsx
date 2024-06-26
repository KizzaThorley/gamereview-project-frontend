import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Slide, toast } from 'react-toastify'
import ReviewCard from './ReviewCard'
import EditReview from './EditReview'
import { baseUrl } from '../config'

export default function SingleGame({ isLoggedIn }) {
  const { gameId } = useParams()
  const [game, setGame] = React.useState(null)
  const [editMode, setEditMode] = React.useState(false)
  const [review, setReview] = React.useState({
    review: "",
    rating: 0,
    addedBy: ""
  })

  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    if (!isLoggedIn) {
      return setUser(false)
    } else {
      setUser(JSON.parse(atob(isLoggedIn.split(".")[1])))
    }
  }, [isLoggedIn])



  async function getGame() {
    try {
      const { data } = await axios.get(`${baseUrl}/games/${gameId}`)
      // console.log(data)
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
      const { data } = await axios.post(`${baseUrl}/games/${gameId}/reviews`, review, {
        headers: { Authorization: `Bearer ${isLoggedIn}` }
      })


      setGame(data)
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 3000,
        transition: Slide
      })
    }
  }

  async function putReview(event) {
    event.preventDefault()
    try {
      const { data } = await axios.put(`${baseUrl}/games/${gameId}/reviews/${review._id}`, review, {
        headers: { Authorization: `Bearer ${isLoggedIn}` }
      })
      setEditMode(false)

      setGame(data)
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 3000,
        transition: Slide
      })
    }
  }

  async function deleteReview(reviewId) {
    try {
      const { data } = await axios.delete(`${baseUrl}/games/${gameId}/reviews/${reviewId}/delete`, {
        headers: { Authorization: `Bearer ${isLoggedIn}` }
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
    if (!user) {
      return
    } else {
      return game.reviews.some((review) => {
        if (review.addedBy.includes(user._id.toString())) {
          return true
        }
      })
    }
  }

  return (
    <div className='flex mx-auto mt-5 md:container px-10 sm:px-6 lg:px-0 p-6 text-center items-center justify-center'>
     <div className='text-center items-center justify-center' >
      {!game ? (
        <h1 className='text-center font-bold text-5xl mt-5 ml-5'>Loading...</h1>
      ) : (
        <>
          <div className='object-center w-fit bg-green-100 m-5 p-5 rounded-xl border-4 border-green-900'>
            <h1 className='text-center font-bold text-5xl mb-5 uppercase'>{game.name} ({game.year})</h1>
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
            <h1 className="text-center font-bold text-5xl mb-5">Reviews</h1>
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
                          {!editMode && <p className='text-left'>{review.review}</p>}
                          <div className='flex flex-column justify-between mr-8 mb-6'>
                            <>
                              <div>
                                {editMode && (
                                  <EditReview
                                    isLoggedIn={isLoggedIn}
                                    putReview={putReview}
                                    changeRating={changeRating}
                                    handleChange={handleChange}
                                    review={review}
                                    editMode={editMode}
                                    setEditMode={setEditMode}
                                  />
                                )
                                }
                              </div>
                              <div className='w-full place-content-center'>
                              {!editMode && (
                                <button
                                  className='mt-6 mb-1 border-teal-900 border-2 w-fit py-1 px-3 rounded-lg self-center text-96 bg-teal-400'

                                  onClick={() => {
                                    setEditMode(!editMode)
                                    setReview(review)
                                  }}
                                >
                                  Edit
                                </button>
                              )
                              }
                              {!editMode && (
                                <button className='mt-6 mb-1 border-teal-900 border-2 w-fit py-1 px-3 rounded-lg self-center text-96 bg-teal-400' onClick={() => {deleteReview(review._id)}}>
                                  Delete
                                </button>
                              )}
                              </div>
                            </>
                          </div>
                        </>
                      ) : (

                        <>
                          <div className='flex flex-row'>
                            {!editMode && stars.map((star, index) => <p key={"star" + index}>{star}</p>)}
                          </div>
                          <p className='text-left mb-8'>{!editMode && review.review}</p>
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
          {game.reviews.length > 0 && (searchReviews()) ? (
          <p className="text-2xl ml-5 font-bold text-center py-1 px-2 text-white font-bold bg-slate-700 rounded-lg w-fit">You've already reviewed this. Edit it above!</p>
          ) :
            <ReviewCard
              isLoggedIn={isLoggedIn}
              postReview={postReview}
              changeRating={changeRating}
              handleChange={handleChange}

            />
          }
        </>
      )}
      </div>
    </div>
  )
}

