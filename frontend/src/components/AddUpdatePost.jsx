import axios from "axios";
import { useState } from "react";

import AddFiles from "./AddFiles.jsx";
import Post from "./Post.jsx";

// const REACT_APP_BASE_URL = require('dotenv')


async function uploadPost(title, text, files) {

    const URL = process.env.REACT_APP_BASE_URL;
    
    const formData = new FormData();
    
    formData.append('title', title);
    formData.append('text_content', text);
    for (let file of files){
        formData.append('files', file)        
    };

    console.log("formData =>", formData);

    try {
        const response = await axios.post(`${URL}/post/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        console.log('Post uploaded successfully');

        return response;
        
    } catch (error) {
        console.log(error);
    }
    
}


function AddUpdatePost() {

    const [ postTitle, setPostTitle ] = useState('');
    const [ postText, setPostText ] = useState('');
    const [ postFileList, setPostFileList ] = useState([]);
    const [ signedUrls, setSignedUrls ] = useState([]);

    const buttonClickHandle = (e) => {
        console.log(postTitle);
        console.log(postText);
        console.log(postFileList);
        // console.log(REACT);

        uploadPost(postTitle, postText, postFileList)
        // .then(res => res.json())
        // .then(data => console.log(data.uploadedFiles))
        .then(res => setSignedUrls(res.data.uploadedFiles))
        .catch(err => console.log(err));
        // .then(res => setSignedUrls([...res]))
        

        // console.log("signedURLS =>", urls);
        

        // setSignedUrls(urls);
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

        <Post props={{postTitle, postText, signedUrls}} />
        
        </>
    )
};


export default AddUpdatePost;