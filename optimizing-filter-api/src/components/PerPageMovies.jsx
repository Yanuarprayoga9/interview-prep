import React from 'react'

export const skips = [3,5,10]
const PerPageMovies = ({limit,setLimit}) => {
    const onChange = (e) => {
        setLimit(e.target.value)
        console.log(limit,e.target.value)
    }
  return (
    <select
    onChange={onChange}
    defaultValue={limit}
    >
        {
            skips.map((skip)=>(
                <option key={skip} value={skip}>{skip} perpage</option>
            ))
        }
    </select>
  )
}

export default PerPageMovies