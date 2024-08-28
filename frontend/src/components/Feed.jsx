import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Post from "./Post.jsx";
import Header from "./Header.jsx";
import { AuthContext } from "../auth/AuthProvider.jsx";


function Feed() {

    const { accessToken, logout, login } = useContext(AuthContext);

    // console.log("Feed component Authcontext =>", AuthContext);

    const [ allPosts, setAllPosts] = useState([]);
    const [ isAuthorized, setAuthorized ] = useState(Boolean(accessToken))
    const [ userName, setUserName ] = useState("anonimous Hamster")

    const navigate = useNavigate();

    // console.log("Feed component isAuthorized =>", isAuthorized);

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
            if (error.response.data.message === 'Access denied. Access token expired') getNewAccessToken();
        }
    }


    const getNewAccessToken = async() => {
        // console.log("Feed component getNewAccessToken =>", "ХУЙ");
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/getnewaccesstoken`, {
                withCredentials: true
            });
            console.log("Feed component getNewAccessToken, response =>", response.headers['x-access-token']);
            console.log("Feed component getNewAccessToken, response =>", response.data.user);

            if (response.data.message === "New access token succesfully created"){
                login(response.data.user, response.headers['x-access-token']);
                setAuthorized(!isAuthorized);
            }

            if (response.status != 201) throw new Error ('Something wrong with response from server')

        } catch (error) {
            console.log("Feed component getNewAccessToken catchError:", error.response.data.message);
            if (error.response?.data?.message === "No refresh token found") {
                logout();
                alert('Please log in');
                navigate('/');
            }
        }
    }


    useEffect(() => {

        console.log("Feed component useEffect isAuthorized =>", isAuthorized);

        if (isAuthorized) {

            const user = JSON.parse(localStorage.getItem("user"));
            console.log("Feed component, useEffect =>", user);
            
            if (user?.first_name) setUserName(user.first_name);
            
            getAllPosts()
            .then(result => setAllPosts(result))
            // .then(res => console.log("Feed component, useEffect =>", res))
            .catch(error => console.log(error));  
        } else getNewAccessToken();

    }, [isAuthorized])






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