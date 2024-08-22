const postsModel = require('../models/postsModel.js');
const images_videosModel = require('../models/images_videosModel.js')


async function createPost(req, res) {

    const { author, created_at, title, text_content, media } = req.body;
    const postInfo = { author, created_at, title, text_content };

    console.log(media);
    

    if (!title && !text_content && !media) {
        return res.status(200).json({ message: "Post can't be empty" });        
    }

    try {
        const newPostInfo = await postsModel.createPost(postInfo);
        let newMediaInfo;
        try {
            newMediaInfo = await images_videosModel.createMedia({post_id: newPostInfo.id, original_filename: media[0]});      
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
            throw error;
        }

        res.status(201).json({
            message: "Post created successfully. Media created successfully",
            post: newPostInfo,
            media: newMediaInfo,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });        
    }
};



module.exports = {
    createPost,

}