const express = require('express');
const router = express.Router();
const shortController = require('../controllers/shortController');

// Rota para criar metadados de um short
router.post('/', shortController.createShortMetadata);

// Rota para listar metadados de shorts
router.get('/', shortController.getAllShortMetadata);

// Rota para buscar metadados de um short
router.post('/:id', shortController.getShortMetadataById);


module.exports = router;