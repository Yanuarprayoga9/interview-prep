import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetSearchPost } from '../../hooks/useGetPost'

function Search() {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const { pathname } = useLocation()
  const { loading, post } = GetSearchPost()


  const onChange = (e) => {
    navigate(`${pathname}?searchTerm=${e.target.value}`)
    setValue(e.target.value )
    console.log(e.target.value)
  }
  return (
    <>
      <input type="text" onChange={onChange} value={value || ''} />
      { loading &&  <h1>loading</h1>}
      {

        post && post.length > 0 ? (
          post.map((p) => (
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
