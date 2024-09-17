const { v4: uuidv4 } = require('uuid');

const { db } = require('../config/db.js');


async function createInvitationLink({ created_by, role }) {
    const trx = await db.transaction();

    try {

    const created_at = new Date().toISOString();
    const invitation_part = uuidv4();
    console.log('invitationsModel, createInvitationLink, created_at, invitation_part =>', created_at, invitation_part);

        const [ invitationLink ] = await trx('invitation_links').insert({ created_at, created_by, role, invitation_part, used: false}, ['id', 'invitation_part', 'created_by', 'role as user_role']);

        await trx.commit();
        return invitationLink;
    } catch (error) {
        await trx.rollback();
        console.log(error);
        throw error;
    }
};


async function getInvitationLink(invitationLink) {
    try {
      const [ invitation ] = await db("invitation_links")
        .select("invitation_links.id", "invitation_links.created_at", "created_by", "invitation_links.role", "invitation_part", 'used', 'users.role as creator_role')
        .where("invitation_part", invitationLink)
        .leftJoin('users', 'users.id', 'invitation_links.created_by');


        // .select("posts.id", "created_at", "last_updated_at", "title", "text_content", "author")
        // .select(db.raw(`
        //     COALESCE(array_agg(images_videos.storage_url)
        //     FILTER (WHERE images_videos.id IS NOT NULL), '{}')
        //     `))
        // .leftJoin('images_videos', 'posts.id', 'images_videos.post_id')
        // .groupBy('posts.id')
        // .orderBy('posts.id', 'desc')
        // if (invitation)

        console.log(invitation);
        
      return invitation;
    } catch (error) {
      throw error;
    }
};


async function setInvitationLinkToUsed(invitationLink) {

    try {
      const [ used_invitation ] = await db("invitation_links")
        .update({ used: true }, ['id', 'invitation_part', 'created_by', 'role as user_role', 'used'])
        .where("invitation_part", invitationLink);


        // .select("posts.id", "created_at", "last_updated_at", "title", "text_content", "author")
        // .select(db.raw(`
        //     COALESCE(array_agg(images_videos.storage_url)
        //     FILTER (WHERE images_videos.id IS NOT NULL), '{}')
        //     `))
        // .leftJoin('images_videos', 'posts.id', 'images_videos.post_id')
        // .groupBy('posts.id')
        // .orderBy('posts.id', 'desc')
        // if (invitation)

        console.log(used_invitation);
        
      return used_invitation;
    } catch (error) {
      throw error;
    }
};



module.exports = {
    createInvitationLink,
    getInvitationLink,
    setInvitationLinkToUsed,

}