const { db } = require('../config/db.js');


async function addPost({ author, created_at, title, text_content}) {
    const trx = await db.transaction();

    try {

        const [ post ] = await trx('posts').insert({ author, created_at, title, text_content, last_updated_at: created_at}, ['id', 'title']);

        await trx.commit();
        return post;
    } catch (error) {
        await trx.rollback();
        console.log(error);
        throw error;
    }
};


module.exports = {
    addPost,

}