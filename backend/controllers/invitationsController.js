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


async function getInvitationLink(req, res) {

    const invitationLink = req.params.invitation;

    try {

        const invitation = await invitationsModel.getInvitationLink(invitationLink);

        if (invitation === undefined) {
            return res.status(404).json({ message: `Invitation link '${invitationLink}' not found`})
        };

        if (invitation.used) {
            return res.status(404).json({ message: `Invitation link '${invitationLink}' has already used`})
        };

        const offsetDate = 1;
        const currentTimeStamp = new Date();
        const expirationDate = new Date(invitation.created_at);
        expirationDate.setDate(expirationDate.getDate() + offsetDate);

        // console.log('invitationController, getInvitationLink, currentTimeStamp, expirationDate =>', currentTimeStamp, expirationDate);
        
        if (currentTimeStamp >= expirationDate) {
            return res.status(404).json({ message: `Invitation link '${invitationLink}' has already expired`})
        }

        if (invitation.creater_role != 'admin') {
            return res.status(404).json({ message: `Invitation link '${invitationLink}' couldn't be used`})
        }


        res.status(200).json({
            message: "Invitation link",
            invitation,

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });            
    }
};


module.exports = {
    createInvitationLink,
    getInvitationLink,

}