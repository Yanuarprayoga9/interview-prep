import React from 'react'

const PaginationMovies = ({ page, setPage, limit, total }) => {
    const totalPages = Math.ceil(total / limit)
    console.log(total, limit)
    console.log({ totalPages })
    const onClick = (newPage) => {
        setPage(newPage + 1)
    }
    console.log({page})
    return (
        <div className='flex gap-x-3 '>
            {page > 1 && <button onClick={() => setPage(page-1)}>{'<<'}</button> } 
            {totalPages > 0 && (
                [...Array(totalPages)].map((val, index) => (
                    <>
                        <button
                            onClick={() => onClick(index)}
                            key={index}
                            className={`${page == index+1 ? 'font-bold' : ''}`}>
                            {index + 1}
                        </button>
                    </>
                ))
            )}
            {page < totalPages && <button onClick={() => setPage(page+1)}>{'>>'}</button> } 
        </div>
    )
}

export default PaginationMovies