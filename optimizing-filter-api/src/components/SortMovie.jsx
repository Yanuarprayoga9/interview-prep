import React from 'react'

const SortMovie = ({ sort, setSort }) => {
    const onSelectChange = (e) => {
        setSort({ sort: e.target.value, order: sort.order })
    }
    const onClickBtnSort = () => {
        if (sort.order === "asc") {
            setSort({ sort: sort.sort, order: "desc" });
        } else {
            setSort({ sort: sort.sort, order: "asc" });
        }
    }
    return (

        <div className='flex gap-x-2'>
            <select name="" id=""
                defaultValue={sort.sort}
                onChange={onSelectChange}
            >
                <option value="year">Year</option>
                <option value="rating">Rating</option>
            </select>
            <button
                onClick={onClickBtnSort}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                {sort.order}
            </button>

        </div>
    )
}

export default SortMovie