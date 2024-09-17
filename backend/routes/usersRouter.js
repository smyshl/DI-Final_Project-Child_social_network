const express = require('express');
const usersController = require('../controllers/usersController.js');
const invitationsController = require('../controllers/invitationsController.js');
const { verifyToken } = require('../middlewares/verifyToken.js');


const router = express.Router();


router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/getnewaccesstoken', usersController.getNewAccessToken);
router.get('/logout', verifyToken, usersController.delRefreshToken);
router.get('/all', verifyToken, usersController.getAllUsers);
router.get('/invite', usersController.getNewUserInvitationLink);

router.get('/invite/createlink/:role', verifyToken, invitationsController.createInvitationLink);
router.get('/register/:invitation', invitationsController.checkInvitationLink);

router.get('/invite/uselink/:invitation', invitationsController.setInvitationLinkToUsed); // only for testing


module.exports = router;