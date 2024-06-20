import { Link } from "react-router-dom"

export default function ReviewCard({ isLoggedIn, postReview, changeRating, handleChange }) {

    return (
        <div className='object-center w-fit bg-blue-100 m-5 p-5 rounded-xl border-4 border-blue-900'>
            {isLoggedIn ? (
                <>
                    <h1 className='text-left font-bold text-5xl mb-5'>Add a review</h1>
                    <form className='flex flex-col' onSubmit={postReview}>
                        <div className='mb-5'>
                            <label htmlFor='rating' className='text-2xl'>Rating: </label>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <input
                                    type='button'
                                    name='rating'
                                    id={num.toString()}
                                    value="⭐"
                                    required
                                    className='cursor-pointer text-4xl opacity-40'
                                    key={num}
                                    onClick={changeRating}
                                />
                            ))}
                        </div>
                        <label htmlFor='review' className='text-2xl mb-2'>Review: </label>
                        <textarea
                            name='review'
                            id='review'
                            rows="9"
                            cols="50"
                            onChange={handleChange}
                            className='p-2 border-blue-900 border-2 rounded-xl bg-gray-100'
                        />
                        <div className='flex justify-center items-center'>
                            <button className='mt-6 mb-1 border-blue-900 border-4 w-fit py-3 px-6 rounded-lg self-center text-xl bg-blue-400'>
                                Submit
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <h1 className='text-left font-bold text-5xl mb-5'>Add a re- wait a minute!</h1>
                    <p>You're not signed in... change that <Link to="/login" className='text-blue-600 underline'>here</Link>, or sign up <Link to="/signup" className='text-blue-600 underline'>here</Link>!</p>
                </>
            )}
        </div>
    )
}

