import React from 'react'
import MovieItem from './MovieItem'

const MovieList = ({ movies }) => {
    console.log(movies)
    return (
        <div className='p-3 gap-4  flex flex-wrap flex-1 justify-center'>
        {
                movies && movies.length > 0 ?
                    (
                        movies.map((movie) => (
                            <MovieItem movie={movie} key={movie._id} />
                        ))
                    ) : (<h1>Movies not found</h1>)

            }
        </div>


    )
}

export default MovieList