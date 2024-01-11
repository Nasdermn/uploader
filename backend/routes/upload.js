const router = require('express').Router();
const fileMiddleware = require('../middleware/file');
const uploadController = require('../controllers/upload');

router.post('/upload', fileMiddleware.single('image'), uploadController.uploadFile);
router.get('/stickers/:position', uploadController.getStickerByPosition);

module.exports = router;
