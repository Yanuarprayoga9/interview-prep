import React, { useEffect } from 'react'
import { baseUrl } from '../constant';

const Home = () => {
    const fetchPost = async () => {
        const res = await fetch(`${baseUrl}`,{
          credentials:"include"
        });
        const data = await res.json()
        console.log(data)
        return data;
      }
     
      
      useEffect(() => {
       
        fetchPost();
      }, [])
  return (
    <div className='bg-red-500'>Home</div>
  )
}

export default Home