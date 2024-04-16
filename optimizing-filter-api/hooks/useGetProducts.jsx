import { useEffect, useState } from "react";
import { UseDebounce } from "./useDebounce";

const useGetProducts = (query) => {
    const debouncedSearch = UseDebounce(query) ;
    const [product, setproduct] = useState(); 

    const fetchproduct = async () => {
        const res = await fetch(`https://dummyjson.com/products/search?q=${debouncedSearch || ''}`);
        const data = await res.json(); 
        console.log({data})
        setproduct(data.products); 
    }

    useEffect(() => {
        fetchproduct(); 
    }, [debouncedSearch]);
    return {product,query}
}

export default useGetProducts