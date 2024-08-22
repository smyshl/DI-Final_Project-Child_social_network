const express = require('express');
const postsController = require('../controllers/postsController.js');


const router = express.Router();


router.post('/create', postsController.createPost);


module.exports = router;