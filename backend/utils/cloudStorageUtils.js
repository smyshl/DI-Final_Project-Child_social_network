const { bucket } = require('../config/cloudStorage.js');
const images_videosModel = require('../models/images_videosModel.js');


async function generateSignedUrl(storage_filename) {
    const options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Max allowed expiration is seven days (604800 seconds)
    };

    const url_expires_at = new Date(options.expires)

    try {
        const [ storage_url ] = await bucket.file(storage_filename).getSignedUrl(options);
        // console.log(`URL for the file ${storage_filename} created successfully, expires at`, url_expires_at); 
        const currentTimeStamp = new Date().toISOString();
        // console.log("URL created", currentTimeStamp);
           
        return {storage_url, url_expires_at};        
    } catch (error) {
        console.log(error);  
    }
}


async function uploadFileToGoogleCloudStorage(file, storage_filename) {

    return new Promise((resolve, reject) => {
        const blob = bucket.file(storage_filename);
        const blobStream = blob.createWriteStream({
            resumable: false,
            gzip: true,
            metadata: {contentType: file.mimetype},
        })

        blobStream.on('finish', async () => {
            try {
                const currentTimeStamp = new Date().toISOString();
                // console.log(`File ${storage_filename} successfully uploaded`, currentTimeStamp);
                const result = await generateSignedUrl(storage_filename);
                resolve(result);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });


        blobStream.on('error', () => {
            reject(error);
            throw new Error `Error while uploading file ${storage_filename}`
        });


        blobStream.end(file.buffer)

    });
};



async function getRefreshedUrls() {

    try {
        const filenamesToRefresh = await images_videosModel.getUrlsToRefresh();

        // console.log("cloudStorageUtils, getRefreshedUrls, filenamesToRefresh, typeof offsetDate =>", filenamesToRefresh.length, filenamesToRefresh);

        for (let index in filenamesToRefresh) {
            const {storage_url, url_expires_at} = await generateSignedUrl(filenamesToRefresh[index].storage_filename);
            filenamesToRefresh[index] = {...filenamesToRefresh[index], storage_url, url_expires_at}
            // console.log(index, storage_url, url_expires_at);
        }

        // if (filenamesToRefresh.length > 0) {
        //     console.log("cloudStorageUtils, getRefreshedUrls, filenamesToRefresh =>", filenamesToRefresh.length)
        //     console.log("cloudStorageUtils, getRefreshedUrls, filenamesToRefresh =>", filenamesToRefresh)
        // };
        
        return filenamesToRefresh;
    } catch (error) {
        console.log(error);
    }

};


async function updateSignedUrls() {
    try {
        
        const refreshedUrls = await getRefreshedUrls();

        if (refreshedUrls.length === 0) {
            console.log("Nothing to update");
            return;
        }

        // console.log("cloudStorageUtils, updateSignedUrls, refreshedUrls =>", refreshedUrls)

        const urlsUpdated = await images_videosModel.updateRefreshedUrls(refreshedUrls);

        if (!urlsUpdated) {
            setTimeout(async() => {
                await images_videosModel.updateRefreshedUrls(refreshedUrls)
            }, 60 * 1000);
        } else {
            console.log("URLs successfully updated");
            return;
        }


    } catch (error) {
        console.log(error);
    }
};




module.exports = {
    generateSignedUrl,
    uploadFileToGoogleCloudStorage,
    getRefreshedUrls,
    updateSignedUrls,
}