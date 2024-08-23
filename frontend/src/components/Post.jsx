

function Post({props}) {


    return (
        <>
        <h2>New post</h2>

        <div>Title - {props.postTitle}</div>
        <div>Text - {props.postText}</div>
        <div>Images:
            {
                props.signedUrls.map((url, index) => (
                     <img key={index} src={url} style={{width: '200px', margin: '5px'}} />
                ))
            }
        </div>
        </>
    )
};


export default Post;