import React from 'react'
import { FaRegStar } from 'react-icons/fa6';

const MovieItem = ({movie}) => {
    return (
        <div className="w-full sm:w-[350px] h-[300px] flex flex-col space-y-3  rounded-xl shadow-md" key={movie._id}>
            <img src={movie.img} alt="" className='object-cover object-center w-full h-48' />
            <span className='absolute  bg-slate-200 p-2 rounded-sm'><FaRegStar className='w-4 h-4 text-yellow-400' />
                {movie.rating}</span>
            <div className="flex  border-b justify-between p-3">
                <p className='font-bold overflow-x-auto'>{movie.name}</p>
                <p className='text-slate500 overflow-x-auto'>{movie.year}</p>
            </div>
            <div className="flex gap-4 px-2 text-slate-400">
                {movie.genre.map((g) => {
                    return (
                        <p key={g}>{g}</p>
                    );
                })}
            </div>
        </div>)  
}

export default MovieItem