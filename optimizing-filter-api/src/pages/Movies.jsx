import React, { useEffect, useState } from 'react'
import { UseDebounce } from '../../hooks/useDebounce'
import { FaMagnifyingGlass, FaRegStar } from "react-icons/fa6";
import SearchInput from '../components/SearchInput';
import MovieList from './MovieList';
import SortMovie from '../components/SortMovie';

export const baseUrl = 'http://localhost:5000'
const Movies = () => {
    const [sort,setSort] = useState({ sort: 'year' , order: 'asc' })
    const [search, setSearch] = useState('')
    const debounced = UseDebounce(search)
    const [obj, setObj] = useState({});
    const getAllmovies = async () => {
        try {
            const url = `${baseUrl}/movies?search=${debounced || ''}&limit=10&sort=${sort.sort},${
                sort.order
            }`
            console.log(url)
            const res = await fetch(url)
            const data = await res.json();
            console.log(data)
            setObj(data);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log({sort})
        getAllmovies();
    }, [debounced,sort.sort,sort.order])
    return (
        <div className='  w-full flex flex-col space-y-6 items-center justify-center'>
            <h1 className='text-3xl font-bold'>Movies page</h1>
            <div className="w-full flex justify-around">
                <SortMovie sort={sort} setSort={setSort} />
                <SearchInput setSearch={setSearch} />
            </div>
            <MovieList movies={obj.movies} />
        </div>
    )
}

export default Movies