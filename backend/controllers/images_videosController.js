const postsModel = require('../models/postsModel.js');
const images_videosModel = require('../models/images_videosModel.js')
const { bucket } = require('../config/cloudStorage.js')
const cloudStorageUtils = require('../utils/cloudStorageUtils.js');


// async function cloudStorageUtils.uploadFileToGoogleCloudStorage(file, storage_filename) {

//     return new Promise((resolve, reject) => {
//         const blob = bucket.file(storage_filename);
//         const blobStream = blob.createWriteStream({
//             resumable: false,
//             gzip: true,
//             metadata: {contentType: file.mimetype},
//         })

//         blobStream.on('finish', async () => {
//             try {
//                 const currentTimeStamp = new Date().toISOString();
//                 console.log(`File ${storage_filename} successfully uploaded`, currentTimeStamp);
//                 const result = await cloudStorageUtils.generateSignedUrl(storage_filename);
//                 resolve(result);
//             } catch (error) {
//                 console.log(error);
//                 reject(error);
//             }
//         });


//         blobStream.on('error', () => {
//             reject(error);
//             throw new Error `Error while uploading file ${storage_filename}`
//         });


//         blobStream.end(file.buffer)

//     });
// };


// async function cloudStorageUtils.generateSignedUrl(storage_filename) {
//     const options = {
//         version: 'v4',
//         action: 'read',
//         expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Max allowed expiration is seven days (604800 seconds)
//     };

//     const url_expires_at = new Date(options.expires)

//     try {
//         const [ storage_url ] = await bucket.file(storage_filename).getSignedUrl(options);
//         console.log(`URL for the file ${storage_filename} created successfully, expires at`, url_expires_at); 
//         const currentTimeStamp = new Date().toISOString();
//         // console.log("URL created", currentTimeStamp);
           
//         return {storage_url, url_expires_at};        
//     } catch (error) {
//         console.log(error);  
//     }
// }



async function uploadImagesVideos({post_id, files}) {

    // console.log(media);
    // console.log("uploadImagesVideos", files, files.length);
    

    if (!files || files.length === 0) {
        throw new Error ("No files received");        
    }

    try {

        const signedUrls = [];

        for (let index in files) {
            const storage_filename = 'postid_' + post_id + '_indexinpost_' + index +'_originalname' + files[index].originalname;
            const { storage_url, url_expires_at } = await cloudStorageUtils.uploadFileToGoogleCloudStorage(files[index], storage_filename)
            // .then(res => console.log('cloudStorageUtils.uploadFileToGoogleCloudStorage promise resolve =>', res))
            // .then(res => signedUrls[index] = res.storage_url)
            // .then(res => images_videosModel.addImagesVideos({post_id, original_filename: files[index].originalname, storage_filename, storage_url, url_expires_at: res.url_expires_at}))
            // .catch(err => console.log(err));
            
            // console.log("images_videoController =>", storage_url, url_expires_at);
            

            // const { storage_url, url_expires_at } = await cloudStorageUtils.generateSignedUrl(storage_filename);

            await images_videosModel.addImagesVideos({post_id, original_filename: files[index].originalname, storage_filename, storage_url, url_expires_at});
            
            signedUrls[index] = storage_url;
        };

        // console.log("images_videoController signedUrls=>", signedUrls);
        
        
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