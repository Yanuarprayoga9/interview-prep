import { useEffect, useState } from "react";
import { baseUrl } from "../src/constant";
import { useSearchParams } from "react-router-dom";
import { UseDebounce } from "./useDebounce";

export function useGetSearchPost() {
    const [post, setPost] = useState();
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('searchTerm');

    const debouncedSearch = UseDebounce(query);
    // const debouncedSearch = query;
    const fetchPost = async () => {
        const res = await fetch(`${baseUrl}/post?searchTerm=${debouncedSearch || ''}`, {
            credentials: "include"
        });
        const data = await res.json();
        console.log({ data })
        setPost(data.posts);
    }

    useEffect(() => {
        fetchPost();
    }, [debouncedSearch]);

    return [post];
}
