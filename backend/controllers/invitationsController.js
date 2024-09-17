const invitationsModel = require('../models/invitationsModel.js')


async function createInvitationLink(req, res) {

    const role = req.params.role;
    const created_by = req.user_id;
    const creator_role = req.creator_role;


    if (role != 'admin' && role != 'regular') {   
        return res.status(404).json({ message: `Invitation link could be created only for admin or regular user`})
    }

    if (creator_role != 'admin') {   
        return res.status(404).json({ message: `Invitation link could be created only by admin user`})
    }

    // console.log('invitationController, createInvitationLink, req =>', role);

    try {

        const invitationLink = await invitationsModel.createInvitationLink({created_by, role});

        res.status(201).json({
            message: "Invitation link successfully created",
            invitationLink,

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });            
    }
};


async function checkInvitationLink(req, res) {

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

        // if role of user who created invitation link has changed, such link couldn't be used
        if (invitation.creator_role != 'admin') {   
            return res.status(404).json({ message: `Invitation link '${invitationLink}' couldn't be used`})
        }


        res.status(200).json({
            message: "Invitation link is valid",
            invitation,

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });            
    }
};


async function setInvitationLinkToUsed(req, res) {

    const invitationLink = req.params.invitation;

    try {
        const used_invitation = await invitationsModel.setInvitationLinkToUsed(invitationLink);

        res.status(201).json({
            message: "Invitation link successfully set to used",
            used_invitation,

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });            
    }
}


module.exports = {
    createInvitationLink,
    checkInvitationLink,
    setInvitationLinkToUsed,

}