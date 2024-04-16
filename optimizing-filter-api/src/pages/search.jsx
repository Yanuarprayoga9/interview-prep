import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {  useGetSearchPost } from '../../hooks/useGetPost'


function Search() {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const { pathname } = useLocation()
  const [data] = useGetSearchPost()


  const onChange = (e) => {
    navigate(`${pathname}?searchTerm=${e.target.value}`)
    setValue(e.target.value )
    console.log(e.target.value)
  }
  return (
    <>
      <input type="text" onChange={onChange} value={value || ''} />
      {

        data && data.length > 0 ? (
          data.map((p) => (
            <p key={p._id}>{p.content}</p>
          ))
        ) : (
          <h1>no post yet</h1>
        )
      }
    </>
  )
}

export default Search
