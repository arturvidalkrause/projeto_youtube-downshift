const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

// Rota para criar metadados de um short
router.post('/', queryController.executeQuery);

router.get('/lookup/:tableName/:columnName', queryController.getLookupValues);

module.exports = router;