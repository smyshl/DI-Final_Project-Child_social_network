const express = require('express');
const multer = require('multer');
const postsController = require('../controllers/postsController.js');
const images_videosModel = require('../models/images_videosModel.js');
const { verifyToken } = require('../middlewares/verifyToken.js')
const cloudStorageUtils = require('../utils/cloudStorageUtils.js')

const storage = multer.memoryStorage();
const upload = multer({storage: storage});  // upload files into memory

const router = express.Router();


router.post('/add', verifyToken, upload.array('files'), postsController.addPost);
router.get('/all', verifyToken, postsController.getAllPosts);
router.delete('/delete/:id', verifyToken, postsController.deletePost);

// router.get('/expiredurls', cloudStorageUtils.updateSignedUrls);


module.exports = router;