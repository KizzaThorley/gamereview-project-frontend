export default function EditReview({ postReview, changeRating, review, handleChange }) {
    return (
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
                defaultValue={review.review}
                onChange={handleChange}
                className='p-2 border-blue-900 border-2 rounded-xl bg-gray-100'
            />
        </form>
    )
}
