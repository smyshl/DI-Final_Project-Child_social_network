const postsModel = require('../models/postsModel.js');
const images_videosModel = require('../models/images_videosModel.js')
const bucket = require('../config/cloudStorage.js')


async function uploadFileToGoogleCloudStorage(file, filename) {

    try {
        const blob = bucket.file(filename);
        const blobStream = blob.createWriteStream({
            resumable: false,
            gzip: true,
            metadata: {contentType: file.mimetype},
        })

        blobStream.on('error', () => {throw new Error `Error while uploading file ${filename}`})
        blobStream.on('finish', () => console.log(`File ${filename} successfully uploaded`));
        blobStream.end(file.buffer)

    } catch (error) {
        console.log(error);
    }

}



async function uploadImagesVideos({post_id, files}) {

    // console.log(media);
    console.log("uploadImagesVideos", files, files.length);
    

    if (!files || files.length === 0) {
        throw new Error ("No files received");        
    }

    try {

        for (let index in files) {
            const storage_filename = 'postid_' + post_id + '_indexinpost_' + index +'_originalname' + files[index].originalname;
            await uploadFileToGoogleCloudStorage(files[index], storage_filename);
            await images_videosModel.addImagesVideos({post_id, original_filename: files[index].originalname, storage_filename});
        };
        

        // console.log(files[0]);
        

        // try {
        //     newMediaInfo = await images_videosModel.createMedia({post_id: newPostInfo.id, original_filename: 'media[0]'});      
            
        // } catch (error) {
        //     console.log(error);
        //     res.status(500).json({ message: error });
        //     throw error;
        // }

        // res.status(201).json({
        //     message: "Post created successfully. Media created successfully",
        //     post: newPostInfo,
        //     media: newMediaInfo,
        // });
        
    } catch (error) {
        console.log(error);
        // res.status(500).json({ message: error });        
    }
};



module.exports = {
    uploadImagesVideos,

}