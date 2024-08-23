const express = require('express');
const multer = require('multer');
const postsController = require('../controllers/postsController.js');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});  // upload files into memory

const router = express.Router();


router.post('/create', upload.array('files'), postsController.addPost);


module.exports = router;