const { db } = require('../config/db.js');


async function addPost({ author, created_at, title, text_content}) {
    const trx = await db.transaction();

    try {

        // console.log("addPost, trying to add a post");    

        const [ post ] = await trx('posts').insert({ author, created_at, title, text_content, last_updated_at: created_at}, ['id', 'title']);
        
        // console.log("addPost, add post =>", post);
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
        
        const allPosts = await db('posts')
        .select("posts.id", "created_at", "last_updated_at", "title", "text_content", "author")
        .select(db.raw(`
            COALESCE(array_agg(images_videos.storage_url)
            FILTER (WHERE images_videos.id IS NOT NULL), '{}')
            `))
        .leftJoin('images_videos', 'posts.id', 'images_videos.post_id')
        .groupBy('posts.id')
        .orderBy('posts.id', 'desc')
        // .limit(10);

        // console.log("postsModel getAllPosts =>", allPosts);

        return allPosts;
    } catch (error) {
        console.log(error);
    }
}


async function deletePost(post_id) {
    const trx = await db.transaction();

    try {

        // console.log("addPost, trying to add a post");    
        const result = await trx('posts').del().where({id: post_id}, ['id', 'title']);
        
        // console.log("addPost, add post =>", post);
        await trx.commit();
        return result;
    } catch (error) {
        await trx.rollback();
        console.log(error);
        throw error;
    }
};


module.exports = {
    addPost,
    getAllPosts,
    deletePost,
}