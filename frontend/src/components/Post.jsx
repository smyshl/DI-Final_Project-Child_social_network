import { useEffect, useRef, useState, useContext } from "react";
import { Card, CardHeader, IconButton, CardMedia, CardContent, Typography, Box } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ImageModal from "./ImageModal.jsx";
import VertIconMenu from "./VertIconMenu.jsx";
import { AuthContext } from "../auth/AuthProvider.jsx";


function Post({props}) {

    const [ selectedImage, setSelectedImage ] = useState(null);
    const [ imageList, setImageList ] = useState(null);
    const [ imageSize, setImageSize ] = useState({});

    const { user } = useContext(AuthContext);

    // console.log("Post component, post.author =>", props.author);
    // console.log("Post component, post.id =>", props.postId);

    let action;

    if (user.user_id && props.author && user.user_id === props.author) {
      action = <VertIconMenu post_id={props.postId} />;
    } else action = null;

    const onClickImageHandle = (e) => {
        // console.log("Post component onClickImageHandle urlToOpen", e.target.src);    
        setSelectedImage(e.target.src);
        setImageList(props.signedUrls);

        if (window.innerWidth >= window.innerHeight) {
          setImageSize({height: window.innerHeight * 0.7, width: 'auto'});
          // setImageSize({width: window.innerWidth * 0.65, height: 'auto'})
        } else {
          setImageSize({width: window.innerWidth * 0.7, height: 'auto'})
        }

        // console.log("Post component selected image width =>", e.target.naturalWidth);
        // console.log("Post component selected image height =>", e.target.naturalHeight);
        // console.log("Post component current viewport width =>", window.innerWidth);
        // console.log("Post component current viewport height =>", window.innerHeight);
    }

    const closeModal = () => {
        setSelectedImage(null);
        setImageList(null);
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
        {/* <div>
          <strong>Title - {props.postTitle}</strong>
        </div> */}

        <Card sx={{ maxWidth: '80vw' }} elevation={7}>
          <CardHeader
            action={ <VertIconMenu post_id={props.postId} /> }
            // action={action}
            title={props.postTitle}
            // subheader="September 14, 2016"
          />
          {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt=""
      /> */}
          <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'}>
            {props.signedUrls?.map((url, index) => (
              <img
                key={index}
                data-src={url}
                ref={(el) => (imgRefs.current[index] = el)}
                style={{ width: "20vw", margin: "1vw", objectFit: 'cover', cursor: 'pointer'}}
                onClick={(e) => onClickImageHandle(e)}
              />
            ))}
          </Box>

          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {props.postText}
            </Typography>
          </CardContent>
          {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
        </Card>

        {/* <div>
          {props.signedUrls?.map((url, index) => (
            <img
              key={index}
              data-src={url}
              ref={(el) => (imgRefs.current[index] = el)}
              style={{ width: "200px", margin: "5px" }}
              onClick={(e) => onClickImageHandle(e)}
            />
          ))}
        </div> */}

        {/* <div>Text - {props.postText}</div> */}

       <ImageModal 
        signedUrl={selectedImage} 
        onClose={closeModal} 
        imageList={imageList} 
        imageSize={imageSize} 
        setSelectedImage={setSelectedImage}/>
      </>
    );
};


export default Post;