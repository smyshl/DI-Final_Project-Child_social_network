const express = require('express');
const usersController = require('../controllers/usersController.js');
const { verifyToken } = require('../middlewares/verifyToken.js')


const router = express.Router();


router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/getnewaccesstoken', usersController.getNewAccessToken);
router.get('/logout', usersController.delRefreshToken);
router.get('/all', usersController.getAllUsers);
router.get('/invite', usersController.getNewUserInvitationLink)


module.exports = router;