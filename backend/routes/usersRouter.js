const express = require('express');
const usersController = require('../controllers/usersController.js');


const router = express.Router();


router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);



module.exports = router;