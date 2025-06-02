const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Middleware para parsear o JSON
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Ola do Backend do Downshift');
});

app.get('/api/test', (req, res) => {
	res.json({
		message: 'API esta funcionando!',
		databaseHost: process.env.DATABASE_HOST;
		minioEndpoint: process.env.MINIO_ENDPOINT
	});
});

// Adicinar as rotas aqui


app.listen(port, () => {
	console.log(`Servidor backend rodando na porta ${port}`);
	console.log('Variáveis de ambiente para conexão:');
	console.log(`DB Host: ${process.env.DATABASE_HOST}`);
	console.log(`DB User: ${process.env.DATABASE_USER}`);
	console.log(`DB Name: ${process.env.DATABASE_NAME}`);
	console.log(`MinIO Endpoint: ${process.env.MINIO_ENDPOINT}`);
	console.log(`MinIO Access Key: ${process.env.MINIO_ACCESS_KEY}`);
});
