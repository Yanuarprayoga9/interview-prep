import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

const SearchInput = ({setSearch}) => {
    return (
        <div className="w-[400px]">
            <div className="p-3 bg-slate-300 flex justify-between rounded-lg focus:shadow-md shadow-sm">
                <input type="text" placeholder='search' className='outline-none bg-slate-300' onChange={(e) => setSearch(e.target.value)} />
                <FaMagnifyingGlass className='w-4 h-4 mt-1' />
            </div>
        </div>)
}

export default SearchInput