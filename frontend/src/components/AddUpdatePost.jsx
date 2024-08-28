import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useState, useContext } from "react";

import AddFiles from "./AddFiles.jsx";
import Post from "./Post.jsx";
import { AuthContext } from "../auth/AuthProvider.jsx";

// const REACT_APP_BASE_URL = require('dotenv')


function AddUpdatePost() {

    const [ postTitle, setPostTitle ] = useState('');
    const [ postText, setPostText ] = useState('');
    const [ postFileList, setPostFileList ] = useState([]);
    const [ signedUrls, setSignedUrls ] = useState([]);

    const { accessToken } = useContext(AuthContext);

    const URL = process.env.REACT_APP_BASE_URL;


    const uploadPost = async (title, text, files) => {


        const formData = new FormData();
        const currentTimeStamp = new Date().toISOString();
        const currentUser = JSON.parse(localStorage.getItem('user'));
        
        formData.append('title', title);
        formData.append('text_content', text);
        formData.append('created_at', currentTimeStamp)
        formData.append('author', currentUser?.id || 0)
        for (let file of files){
            formData.append('files', file)        
        };
    
        // console.log("formData =>", formData);
    
        try {
            const response = await axios.post(`${URL}/post/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': accessToken,
                }
            });
    
            // console.log('Post sent to server successfully');
    
            return response;
            
        } catch (error) {
            console.log(error);
        }
    };



    const buttonClickHandle = (e) => {
        // console.log(postTitle);
        // console.log(postText);
        // console.log(postFileList);

        uploadPost(accessToken, postTitle, postText, postFileList)
        .then(res => setSignedUrls(res?.data.signedUrls))
        .catch(err => console.log(err));

    }


    return (
        <>
        <h2>Add/Update post</h2>

        <input id="postTitle" placeholder="Title" onChange={(e) => setPostTitle(e.target.value)} ></input> <br /> <br />
        
        <textarea id="postText" placeholder="Text" cols={40} rows={7} onChange={(e) => setPostText(e.target.value)} ></textarea>       
        <br /> <br /> 
        <AddFiles setPostFileList={setPostFileList} />

        <button onClick={buttonClickHandle}>Add post</button>
        <br /> <br /> 
        <h2>New post:</h2>
        <Post props={{postTitle, postText, signedUrls}} />
        
        </>
    )
};


export default AddUpdatePost;