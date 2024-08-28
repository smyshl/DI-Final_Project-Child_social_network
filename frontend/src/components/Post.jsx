import { useEffect, useRef, useState } from "react";

import ImageModal from "./ImageModal.jsx";


function Post({props}) {

    const [ selectedImage, setSelectedImage ] = useState(null);

    const onClickImageHandle = (e) => {
        // console.log("Post component onClickImageHandle urlToOpen", e.target.src);    
        setSelectedImage(e.target.src);
    }

    const closeModal = () => {
        setSelectedImage(null);
    }

    // console.log("Post component, props =>", props);

    const imgRefs = useRef([]);

    useEffect(() => {

        const lazyLoadImages = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                };
            });
        };

        const observer = new IntersectionObserver(lazyLoadImages, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        imgRefs.current.forEach((imgRef) => {
            if (imgRef) {
                observer.observe(imgRef);
            }
        });

        return () => {
            observer.disconnect();
        };
        
    }, [props]);

    return (
        <>

        <div>Title - {props.postTitle}</div>
        <div>Text - {props.postText}</div>
        <div>
            {
                props.signedUrls?.map((url, index) => (
                     <img key={index} data-src={url} ref={el => imgRefs.current[index] = el} style={{width: '200px', margin: '5px'}} onClick={(e) => onClickImageHandle(e)} />
                ))
            }
        </div>

        <ImageModal signedUrl={selectedImage} onClose={closeModal} />

        </>
    )
};


export default Post;