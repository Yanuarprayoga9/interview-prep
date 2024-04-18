import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchInput = ({setSearch}) => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const onChange = (e) => {
        setSearch(e.target.value)
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('search', e.target.value)
        navigate(`${pathname}?search=${e.target.value}`)
    }
    return (
        <div className="w-[400px]">
            <div className="p-3 bg-slate-300 flex justify-between rounded-lg focus:shadow-md shadow-sm">
                <input type="text" placeholder='search' className='outline-none bg-slate-300' onChange={onChange} />
                <FaMagnifyingGlass className='w-4 h-4 mt-1' />
            </div>
        </div>)
}

export default SearchInput