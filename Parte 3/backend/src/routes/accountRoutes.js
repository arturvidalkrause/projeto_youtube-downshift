const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Rota para criar metadados de uma conta
router.post('/create', accountController.createAccountMetadata);

// Rota para criar metadados de uma conta
router.get('/login', accountController.updateAccountMetadata);

module.exports = router;