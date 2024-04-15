import { useEffect, useState } from 'react'

import './App.css'
import { baseUrl } from './constant'

function Search() {
  const [post, setPost] = useState()
  const [query, setQuery] = useState()
 
  const fetchPost = async () => {
    const res = await fetch(`${baseUrl}/post?searchTerm=${query}`,{
      credentials:"include"
    });
    const data = await res.json()
    setPost(data.posts)
    console.log(data.posts)
    return data;
  }
 
  const onChange = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value)
  }
  useEffect(() => {
   
    fetchPost();
  }, [query])
  return (
    <>
      <input type="text" onChange={onChange} />
      {
        post && (
          post.map((p) => (
            <p key={p._id}>{p.content}</p>
          ))
        )
      }
    </>
  )
}

export default Search
