const { db } = require('../config/db.js');


async function addPost({ author, created_at, title, text_content}) {
    const trx = await db.transaction();

    try {

        console.log("addPost, trying to add a post");    

        const [ post ] = await trx('posts').insert({ author, created_at, title, text_content, last_updated_at: created_at}, ['id', 'title']);
        
        console.log("addPost, add post =>", post);
        await trx.commit();
        return post;
    } catch (error) {
        await trx.rollback();
        console.log(error);
        throw error;
    }
};


async function getAllPosts() {

    try {
        
        const allPosts = await db('posts').select("id", "created_at", "last_updated_at", "title", "text_content", "author");

        console.log("postsModel getAllPosts =>", allPosts);

        return allPosts;
    } catch (error) {
        console.log(error);
        
    }

}


module.exports = {
    addPost,
    getAllPosts,
}