import { useState } from "react";

import AddFiles from "./AddFiles.jsx";



function AddUpdatePost() {

    const [ postTitle, setPostTitle ] = useState('');
    const [ postText, setPostText ] = useState('');
    const [ postFileList, setPostFileList ] = useState([]);

    const buttonClickHandle = (e) => {
        console.log(postTitle);
        console.log(postText);
        console.log(postFileList);

        
    }


    return (
        <>
        <h2>Add/Update post</h2>

        <input id="postTitle" placeholder="Title" onChange={(e) => setPostTitle(e.target.value)} ></input> <br /> <br />
        
        <textarea id="postText" placeholder="Text" cols={40} rows={7} onChange={(e) => setPostText(e.target.value)} ></textarea>       
        <br /> <br /> 
        <AddFiles setPostFileList={setPostFileList} />

        <button onClick={buttonClickHandle}>Add post</button>
        </>
    )
};


export default AddUpdatePost;