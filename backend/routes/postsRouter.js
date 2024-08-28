const express = require('express');
const multer = require('multer');
const postsController = require('../controllers/postsController.js');
const { verifyToken } = require('../middlewares/verifyToken.js')

const storage = multer.memoryStorage();
const upload = multer({storage: storage});  // upload files into memory

const router = express.Router();


router.post('/add', upload.array('files'), postsController.addPost);
router.get('/all', verifyToken, postsController.getAllPosts);


module.exports = router;