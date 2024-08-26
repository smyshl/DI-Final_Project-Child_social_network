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


module.exports = {
    addImagesVideos,

}