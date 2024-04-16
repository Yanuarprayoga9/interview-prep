import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetProducts from '../../hooks/useGetProducts'

const SearchProd = () => {
    const [value,setValue] = useState()
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const {product} = useGetProducts(value)
    console.log(product)
    const onChange = (e) => {
        navigate(`${pathname}?q=${e.target.value}`)
        setValue(e.target.value)
    }
  return (
    <div>
        <input type="text" onChange={onChange} value={value || ''} />
    </div>
  )
}

export default SearchProd