const { v4: uuidv4 } = require('uuid');

const { db } = require('../config/db.js');


async function createInvitationLink({ created_by, role }) {
    const trx = await db.transaction();

    try {

    const created_at = new Date().toISOString();
    const invitation_part = uuidv4();
    console.log('invitationsModel, createInvitationLink, created_at, invitation_part =>', created_at, invitation_part);

        const [ invitationLink ] = await trx('invitation_links').insert({ created_at, created_by, role, invitation_part, used: false}, ['id', 'invitation_part']);

        await trx.commit();
        return invitationLink;
    } catch (error) {
        await trx.rollback();
        console.log(error);
        throw error;
    }
};


module.exports = {
    createInvitationLink,

}