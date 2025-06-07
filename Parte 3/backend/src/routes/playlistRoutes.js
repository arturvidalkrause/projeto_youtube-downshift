const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

// Rota para criar metadados de um short
router.post('/', playlistController.createPlaylistMetadata);

// Rota para listar metadados de shorts
router.get('/', playlistController.getAllPlaylistMetadata);

// Rota para buscar metadados de um short
router.post('/:id', playlistController.getPlaylistMetadataById);


module.exports = router;