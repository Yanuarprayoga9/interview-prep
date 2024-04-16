import React from 'react'

const PaginationMovies = ({ page, setPage, limit, total }) => {
    const totalPages = Math.ceil(total / limit)
    console.log({ totalPages })
    const onClick = (newPage) => {
        setPage(newPage+1)
    }
    return (
        <div className='flex gap-x-3 '>
            {totalPages > 0 && (
                [...Array(totalPages)].map((val, index) => (
                    <button
                        onClick={() => onClick(index)}
                        key={index}
                        className="=  font-bold  rounded">
                        {index+1}
                    </button>
                ))
            )}
        </div>
    )
}

export default PaginationMovies