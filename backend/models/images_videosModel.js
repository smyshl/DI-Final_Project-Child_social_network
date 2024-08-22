const { db } = require('../config/db.js');


async function createMedia({ post_id, original_filename, storage_filename, storage_url }) {
    const trx = await db.transaction();

    try {

        const [ media ] = await trx('images_videos').insert({ post_id, original_filename, storage_filename, storage_url}, ['id', 'original_filename']);

        await trx.commit();
        return media;
    } catch (error) {
        await trx.rollback();
        console.log(error);
        throw error;
    }
};


module.exports = {
    createMedia,

}