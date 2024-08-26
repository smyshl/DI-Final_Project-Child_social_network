const postsModel = require('../models/postsModel.js');
const images_videosModel = require('../models/images_videosModel.js')
const images_videosController = require('./images_videosController.js')


async function addPost(req, res) {

    const { author, created_at, title, text_content } = req.body;
    const postInfo = { author, created_at, title, text_content };

    // console.log(media);
    // console.log("addPost controller, files in post =>", req.files);
    

    if (!title && !text_content && (!req.files || req.files.length === 0)) {
        console.log("addPost controller condition =>", !title && !text_content && (!req.files || req.files.length === 0));
        
        return res.status(200).json({ message: "Post can't be empty" });        
    }

    try {
        const newPostInfo = await postsModel.addPost(postInfo);
        console.log("new post added =>", postInfo);
        
        let signedUrls = [];
        let message = '';
        try {
            signedUrls = await images_videosController.uploadImagesVideos({post_id: newPostInfo.id, files: req.files});
            message = 'Media added successfully'
        } catch (error) {
            console.log(error);
            message = 'No media';
            // res.status(500).json({ message: error });
            // throw error;
        }

        // console.log("postController right before sending links to front, message =>:", message);
        // console.log("postController right before sending links to front, newPostInfo =>:", newPostInfo);
        // console.log("postController right before sending links to front, signedURLs =>:", signedUrls);
        
        res.status(201).json({
            message: "Post added successfully. " + message,
            post: newPostInfo,
            signedUrls,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });        
    }
};


async function getAllPosts(req, res) {

    try {
        
        const allPosts = await postsModel.getAllPosts();

        res.status(201).json({
            message: "All posts successfully received",
            allPosts,

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });            
    }
};



module.exports = {
    addPost,
    getAllPosts,
}