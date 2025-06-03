const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Rota para criar metadados de um novo video
router.post('/', videoController.createVideoMetadata);

// Rota para listar todos os metadados de videos
router.get('/', videoController.getAllVideosMetadata);

// Rota para buscar metadados de um video especifico pelo ID
router.get('/:id', videoController.getVideoMetadataById);

// Adicioanar outras rotas

module.exports = router;