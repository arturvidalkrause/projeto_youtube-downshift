const express = require('express');

// Esta função recebe a instância do tusServer e retorna um roteador pronto
function createUploadRouter(tusServer) {
	const router = express.Router();

	// Anexa o manipulador do Tus a esta rota
	router.all('*', tusServer.handle.bind(tusServer));

	return router;
}

module.exports = { createUploadRouter };