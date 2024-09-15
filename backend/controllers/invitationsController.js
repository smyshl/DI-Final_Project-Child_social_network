const invitationsModel = require('../models/invitationsModel.js')


async function createInvitationLink(req, res) {

    try {

        const invitationLink = await invitationsModel.createInvitationLink({created_by: 23, role: 'regular'});

        res.status(201).json({
            message: "Invitation link successfully created",
            invitationLink,

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });            
    }
};


module.exports = {
    createInvitationLink,

}