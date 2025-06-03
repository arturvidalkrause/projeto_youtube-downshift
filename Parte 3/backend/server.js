const app = require('./src/app');
const { testConnection: testPgConnection } = require('./src/config/db');
const { testMinIOConnection } = require('./src/config/minioClient');

const port = process.env.PORT || 3001;

// Inicia o servidor

const startServer = async () => {
	// Testa as conecções antes de iniciar o servidor
	await testPgConnection();
	await testMinIOConnection();

	app.listen(port, () => {
		console.log(`Servidor backend rodando na porta ${port}`);
		console.log(`Acesse a API de health em http://localhost:${port}/api/health (ou usando o IP do servidor)`);
	});
};

startServer().catch(error => {
	console.error("Falha so iniciar o servidor:", error);
	process.exit(1);
});