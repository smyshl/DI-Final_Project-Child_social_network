import axios from "axios";
import { useEffect, useState, useContext } from "react";

import Post from "./Post.jsx";
// import { AuthContext } from "../auth/AuthProvider.jsx";


function Feed() {

    // const { user, accessToken } = useContext(AuthContext);

    console.log("Feed Component, user, accessToken");
    
    const [ allPosts, setAllPosts] = useState([]);

    const getAllPosts = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/all`)
            console.log("Feed component, getAllPosts =>", response.data.allPosts);
            // console.log("Feed component, getAllPosts =>", response);

            if (response.status !== 201) throw new Error ('Something wrong with response from server')
                          
            return response.data.allPosts

        } catch (error) {
            console.log(error);  
        }
    }

    useEffect(() => {
        getAllPosts()
        .then(result => setAllPosts(result))
        // .then(result => console.log("Feed component, useEffect allPosts =>", allPosts))
        .catch(error => console.log(error));
    }, [])



    return (
        <>
            {/* <h2>Hi, {user?.first_name}</h2> */}
            {
            allPosts?.map((post, index) => (
                <div key={index}>
                     <Post props={{postTitle: post.title, postText: post.text_content, signedUrls: post.coalesce, postId: post.id}} />
                     <br />
                </div>
            ))
            }


        </>
    )
}


export default Feed;