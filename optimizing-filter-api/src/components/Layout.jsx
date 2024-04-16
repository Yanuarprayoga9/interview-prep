import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className=''>
        <h1>header</h1>
        <Outlet/>
        <h1>footer</h1>
    </div>
  )
}

export default Layout