const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { progressUpdatesController } = require('../services/progressUpdates');
router.get('/content/progress/:contentId', progressUpdatesController);

// Importa middlewares
// const { uploadVideo } = require('../middlewares/uploadVideo')
// const { authMiddleware } = require('../middlewares/authMidlleware')

// Rota para listar todos os metadados de videos
router.get('/', videoController.getAllVideosMetadata);

// Rota para buscar metadados de um video especifico pelo ID
router.get('/:id', videoController.getVideoMetadataById);

module.exports = router;