const { createApp } = require('./src/app');
const { testConnection: testPgConnection } = require('./src/config/db');
const { testMinIOConnection } = require('./src/config/minioClient');
const { initializeConnectionFirebaseAdmin } = require('./src/config/initializeFirebaseAdmin');

const port = process.env.PORT || 3001;

const startServer = async () => {
	// Testa as conecções antes de iniciar o servidor
	await testPgConnection();
	await testMinIOConnection();

	// Realiza a coneccao ao Firebase
	await initializeConnectionFirebaseAdmin();

	const app = await createApp();

	app.listen(port, () => {
		console.log(`Servidor backend rodando na porta ${port}`);
	});
};

startServer().catch(error => {
	console.error("Falha so iniciar o servidor:", error);
	process.exit(1);
});