const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Rota para criar metadados de uma conta
router.post('/', accountController.createAccountMetadata);

// Rota para buscar metadados de uma conta
router.post('/:id', accountController.getAccountMetadataById);


module.exports = router;