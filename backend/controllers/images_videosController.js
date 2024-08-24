const postsModel = require('../models/postsModel.js');
const images_videosModel = require('../models/images_videosModel.js')
const { bucket } = require('../config/cloudStorage.js')


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
    };
};


async function generateSignedUrl(storage_filename) {
    const options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Max allowed expiration is seven days (604800 seconds)
    };

    const url_expires_at = new Date(options.expires)
    console.log("url expires at", url_expires_at);
    

    const [ storage_url ] = await bucket.file(storage_filename).getSignedUrl(options);
    return { storage_url, url_expires_at};
}



async function uploadImagesVideos({post_id, files}) {

    // console.log(media);
    console.log("uploadImagesVideos", files, files.length);
    

    if (!files || files.length === 0) {
        throw new Error ("No files received");        
    }

    try {

        const signedUrls = [];

        for (let index in files) {
            const storage_filename = 'postid_' + post_id + '_indexinpost_' + index +'_originalname' + files[index].originalname;
            await uploadFileToGoogleCloudStorage(files[index], storage_filename);

            const { storage_url, url_expires_at } = await generateSignedUrl(storage_filename);

            await images_videosModel.addImagesVideos({post_id, original_filename: files[index].originalname, storage_filename, storage_url, url_expires_at});
            
            signedUrls[index] = storage_url;
        };
        
        return signedUrls;

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