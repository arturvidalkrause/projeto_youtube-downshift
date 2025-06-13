// src/services/progressUpdates.js

// Este objeto irá armazenar as conexões abertas dos clientes.
// A chave será o ID do conteúdo (nanoid) e o valor será o objeto 'response' do Express.
const clients = {};

// Função para enviar progresso para um cliente específico
function sendProgress(contentId, data) {
	const client = clients[contentId];
	if (client) {
		// O formato 'data: ...\n\n' é obrigatório para o protocolo SSE
		client.res.write(`data: ${JSON.stringify(data)}\n\n`);
	}
}

// Função para fechar a conexão de um cliente
function closeConnection(contentId) {
	const client = clients[contentId];
	if (client) {
		client.res.end(); // Fecha a conexão
		delete clients[contentId]; // Remove da lista
		console.log(`[SSE] Conexão fechada para o conteúdo: ${contentId}`);
	}
}

// Controller do Express para o endpoint SSE
const progressUpdatesController = (req, res) => {
	const { contentId } = req.params;

	// Headers essenciais para SSE
	const headers = {
		'Content-Type': 'text/event-stream',
		'Connection': 'keep-alive',
		'Cache-Control': 'no-cache'
	};
	res.writeHead(200, headers);

	console.log(`[SSE] Novo cliente conectado para o conteúdo: ${contentId}`);

	// Armazena a conexão do novo cliente
	clients[contentId] = { res };

	// Quando o cliente fechar a aba ou a conexão cair, removemos ele da lista
	req.on('close', () => {
		console.log(`[SSE] Cliente desconectado para o conteúdo: ${contentId}`);
		delete clients[contentId];
	});
};

module.exports = {
	sendProgress,
	closeConnection,
	progressUpdatesController,
};