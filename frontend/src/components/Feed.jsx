import axios from "axios";
import { useEffect, useState, useContext } from "react";

import Post from "./Post.jsx";
import Header from "./Header.jsx";
import { AuthContext } from "../auth/AuthProvider.jsx";


function Feed() {

    const { accessToken } = useContext(AuthContext);

    // console.log("Feed component Authcontext =>", AuthContext);

    const [ allPosts, setAllPosts] = useState([]);
    const [ isAuthorized, setAuthorized ] = useState(Boolean(accessToken))    

    console.log("Feed component isAuthorized =>", isAuthorized);    

    const user = JSON.parse(localStorage.getItem("user"));
    let userName;

    if (user.first_name) {
        userName = user.first_name;
    } else {
        userName = 'anonimous Hamster';
    };

    // console.log("Feed Component, user, accessToken =>", accessToken);
    


    const getAllPosts = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/all`, {
                headers: {
                    'x-access-token': accessToken,
                }
            })
            console.log("Feed component getAllPosts, response status =>", response.status);
            console.log("Feed component, getAllPosts =>", response.data.allPosts);
            // console.log("Feed component, getAllPosts =>", response);

            if (response.status != 201) throw new Error ('Something wrong with response from server')
                          
            return response.data.allPosts

        } catch (error) {        
            console.log("Feed component getAllPosts catchError:", error.response.data.message);  
        }
    }


    const getNewAccessToken = async() => {
        console.log("Feed component getNewAccessToken =>", "ХУЙ");
        
    }


    useEffect(() => {
        if (isAuthorized) {
            getAllPosts()
            .then(result => setAllPosts(result))
            // .then(res => console.log("Feed component, useEffect =>", res))
            .catch(error => console.log(error));  
        } else getNewAccessToken();

    }, [])



    return (
      <>

        {/* <header>
          <Header />
        </header> */}

        <h2>Hi, {userName}</h2>
        <div>{accessToken}</div>
        {allPosts?.map((post, index) => (
          <div key={index}>
            <Post
              props={{
                postTitle: post.title,
                postText: post.text_content,
                signedUrls: post.coalesce,
                postId: post.id,
              }}
            />
            <br />
          </div>
        ))}
      </>
    );
}


export default Feed;