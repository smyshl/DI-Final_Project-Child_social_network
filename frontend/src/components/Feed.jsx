import axios from "axios";
import { useEffect, useState } from "react";

import Post from "./Post";


function Feed() {

    const [ allPosts, setAllPosts] = useState([]);

    const getAllPosts = async() => {
        try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/all`)
        console.log(response.data.allPosts);
        
        return response
        } catch (error) {
            console.log(error);  
        }
    }

    useEffect(() => {
        setAllPosts(getAllPosts());
    }, [])



    return (
        <>
            <h2>Feed</h2>
        
        </>
    )
}


export default Feed;