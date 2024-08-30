import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Post from "./Post.jsx";
import AddUpdatePost from "./AddUpdatePost.jsx";
import { AuthContext } from "../auth/AuthProvider.jsx";
import LoginRegister from "./LoginRegister.jsx"
import ModalWindow from "./ModalWindow.jsx";
import Header from "./Header.jsx";


function Feed() {

    const { accessToken, logout, login, loggedIn } = useContext(AuthContext);

    // console.log("Feed component Authcontext =>", AuthContext);

    const [ allPosts, setAllPosts] = useState([]);
    const [ isAuthorized, setAuthorized ] = useState(Boolean(accessToken))
    const [ loginIsOpen, setLoginIsOpen ] = useState(false);
    const [ addPostIsOpen, setAddPostIsOpen ] = useState(false);

    const navigate = useNavigate();

    // console.log("Feed component userName =>", userName);
    // console.log("Feed Component, user, accessToken =>", accessToken);
    
    const getAllPosts = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/all`, {
                headers: {
                    'x-access-token': accessToken,
                }
            })
            // console.log("Feed component getAllPosts, response status =>", response.status);
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
                setAuthorized(true);
            }

            if (response.status != 201) throw new Error ('Something wrong with response from server')

            return response;

        } catch (error) {
            console.log("Feed component getNewAccessToken catchError:", error.response.data.message);
            if (error.response?.data?.message === "No refresh token found") {
                logout();
                // alert('Please log in');
                // setLoginIsOpen(true);
                navigate('/');
            }
        }
    }

    const onCloseAddPost = () => {
        setAddPostIsOpen(false);
        // console.log("Feed component onCloseAddPost LoggedIn =>", loggedIn);
        // console.log("Feed component onCloseAddPost isAuthorized =>", isAuthorized);        
    }

    // useEffect(() => {
    //     console.log("Feed component useEffect LoggedIn =>", loggedIn);
    //     if (loggedIn) {
    //         setLoginIsOpen(false)}
    //         setAuthorized(true);
    // }, [loggedIn])


    useEffect(() => {

        if (loggedIn) {
            setLoginIsOpen(false)}
            setAuthorized(true);

        console.log("Feed component useEffect LoggedIn 1=>", loggedIn);
        console.log("Feed component useEffect isAuthorized 2=>", isAuthorized);

        if (isAuthorized) {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log("Feed component, useEffect, user =>", user);
            
            if (true) {
                console.log("Feed component useEffect/isAuthorized, loggedIn => getting all posts");
                getAllPosts()
                .then(result => setAllPosts([...result]))
                // .then(res => console.log("Feed component, useEffect =>", res))
                .catch(error => console.log(error))
            };  
        } else getNewAccessToken();

    }, [isAuthorized, loggedIn])


    useEffect(() => {
        console.log("Feed component useEffect/addPostIsOpen => getting new access token and all posts, addPostIsOpen =>", addPostIsOpen);
        
       getNewAccessToken()
         .then((response) => {
           console.log(
             "Feed component useEffect/addPostIsOpen => new access token received =>",
             response.headers["x-access-token"]
           );
           return;
         })
         .then(() => {
           if (!addPostIsOpen) {
             console.log(
               "Feed component useEffect/addPostIsOpen => trying to get all posts =>"
             );
             getAllPosts()
             .then(result => setAllPosts([...result]))
             .then(() => console.log("Feed component useEffect/addPostIsOpen => all posts successfully received =>"))
             .catch(error => console.log(error))
           }
         })
         .catch((err) => console.log(err));
    }, [addPostIsOpen])



    return (
      <>

        <header>
          <Header setAddPostIsOpen={setAddPostIsOpen} addPostIsOpen={addPostIsOpen} />
        </header>

        {/* <div>
          <Button onClick={() => setAddPostIsOpen(!addPostIsOpen)}>
            Add post
          </Button>
        </div> */}


        <ModalWindow isOpen={addPostIsOpen} onClose={onCloseAddPost}>
            <AddUpdatePost action={"Add new post"}/>
        </ModalWindow>


        <ModalWindow isOpen={loginIsOpen} >
            <LoginRegister action={'Login'}/>
        </ModalWindow>

        <div className="feedMainWrapper">
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
        </div>
      </>
    );
}


export default Feed;