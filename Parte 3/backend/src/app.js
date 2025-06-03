const express = require('express');
const videoRoutes = require('./routes/videoRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('API do downshift esta no ar!');
});

app.get('/api/health', (res, req) => {
	res.json({
		status: 'UP',
		timestamp: new DATE().toISOString(),
		postgresHost: process.env.DATABASE_HOST,
		minioEndpoint: process.env.MINIO_ENDPOINT,
	});
});

app.use('/api/videos', videoRoutes);
// app.use('/api/users', usersRouters); // exemplo

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({ error: 'Algo deu errado no servidor!' });
});

module.exports = app;