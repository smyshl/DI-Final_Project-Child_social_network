import { useEffect } from "react";


function Post({props}) {

    // console.log("Post component, props =>", props);

    // useEffect(() => {
    //     console.log("Post props =>", props);
        
    // }, [props]);

    return (
        <>

        <div>Title - {props.postTitle}</div>
        <div>Text - {props.postText}</div>
        <div>
            {
                props.signedUrls?.map((url, index) => (
                     <img key={index} src={url} style={{width: '200px', margin: '5px'}} />
                ))
            }
        </div>
        </>
    )
};


export default Post;