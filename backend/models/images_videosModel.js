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

    // console.log("images_videosModel, getfilenamesToRefresh, types of now.getDate(), offsetDate=>", typeof now.getDate(), typeof offsetDate);

    expirationDateCheck.setDate(now.getDate() + offsetDate);

    // console.log("images_videosModel, getUrlsToRefresh, now, expirationDateCheck =>", now, expirationDateCheck);
    
    try {
        const filenamesToRefresh = await db("images_videos")
          .select("id", "storage_filename")
          .where('url_expires_at', '<=', expirationDateCheck)
          .orWhereNull('url_expires_at')
          .orWhereNull('storage_url');

        // console.log("images_videosModel, getfilenamesToRefresh, filenamesToRefresh =>", filenamesToRefresh.length, filenamesToRefresh);
        
        return filenamesToRefresh;
      } catch (error) {
        throw error;
      }
};


async function updateRefreshedUrls(refreshedUrls) {

    // console.log("images_videosModel, updateRefreshedUrls, refreshedUrls =>", refreshedUrls);

    await db.schema.dropTableIfExists('temp_refreshed_urls');

    const trx = await db.transaction();

    try {

        const tempTable = await trx.schema.createTable('temp_refreshed_urls', (table) => {
            table.integer('id');
            table.text('storage_url');
            table.text('storage_filename');
            table.timestamp('url_expires_at', { useTz: true });
        });

        await trx('temp_refreshed_urls').insert(refreshedUrls);

        const updatedUrls = await trx.raw(`
            UPDATE images_videos
            SET storage_url = temp_refreshed_urls.storage_url,
                url_expires_at = temp_refreshed_urls.url_expires_at
            FROM temp_refreshed_urls
            WHERE images_videos.id = temp_refreshed_urls.id
            RETURNING images_videos.id
          `);

        // console.log("images_videosModel, updateRefreshedUrls, updatedUrls.length =>", );

        trx.commit();

        await db.schema.dropTableIfExists('temp_refreshed_urls');

        return refreshedUrls.length === updatedUrls.rows.length;

    } catch (error) {
        console.log(error);
        trx.rollback();
        await db.schema.dropTableIfExists('temp_refreshed_urls');
    }

}


module.exports = {
    addImagesVideos,
    getUrlsToRefresh,
    updateRefreshedUrls,

}