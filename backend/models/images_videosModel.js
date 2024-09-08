const { db } = require('../config/db.js');


async function addImagesVideos({ post_id, original_filename, storage_filename, storage_url, url_expires_at }) {
    const trx = await db.transaction();

    // console.log({ post_id, original_filename, storage_filename, storage_url, url_expires_at });
    // console.log("storage_url length", storage_url.length);
    

    try {

        const [ media ] = await trx('images_videos').insert({ post_id, original_filename, storage_filename, storage_url, url_expires_at}, ['id', 'original_filename']);

        await trx.commit();
        return media;
    } catch (error) {
        await trx.rollback();
        console.log(error);
        throw error;
    }
};


async function getUrlsToRefresh(offsetDate = 1) {
    const now = new Date();
    const expirationDateCheck = new Date();

    console.log("images_videosModel, getfilenamesToRefresh, types of now.getDate(), offsetDate=>", typeof now.getDate(), typeof offsetDate);

    expirationDateCheck.setDate(now.getDate() + offsetDate);

    console.log("images_videosModel, getUrlsToRefresh, now, expirationDateCheck =>", now, expirationDateCheck);
    

    try {
        const filenamesToRefresh = await db("images_videos")
          .select("id", "storage_filename")
          .where('url_expires_at', '<=', expirationDateCheck);

        // console.log("images_videosModel, getfilenamesToRefresh, filenamesToRefresh =>", filenamesToRefresh.length, filenamesToRefresh);
        
        return filenamesToRefresh;
      } catch (error) {
        throw error;
      }
};


module.exports = {
    addImagesVideos,
    getUrlsToRefresh,

}