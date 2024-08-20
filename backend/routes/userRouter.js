const express = require('express');
const userController = require('../controllers/userController.js');


const router = express.Router();


router.post('/register', userController.registerUser);



module.exports = router;