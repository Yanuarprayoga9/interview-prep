import { useEffect, useState } from "react";
import { baseUrl } from "../src/constant";
import { useLocation } from 'react-router-dom'
import { UseDebounce } from "./useDebounce";

export function GetSearchPost() {
    const [post, setPost] = useState(); 
    const [loading, setLoading] = useState(false); 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('searchTerm');

    const debouncedSearch = UseDebounce(query) ;
    // const debouncedSearch = query;
    const fetchPost = async () => {
        setLoading(true); 
        const res = await fetch(`${baseUrl}/post?searchTerm=${debouncedSearch}`, {
            credentials: "include"
        });
        const data = await res.json(); 
        console.log({data})
        setPost(data.posts); 
        setLoading(false); 
    }

    useEffect(() => {
        fetchPost(); 
    }, [debouncedSearch]); 

    return {loading, post}; 
}
