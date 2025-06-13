const express = require('express');

// Importa middlewares
const { authMiddleware } = require('./middlewares/authMidlleware');

// Importa as rotas SÍNCRONAS
const accountRoutes = require('./routes/accountRoutes');
const videoRoutes = require('./routes/videoRoutes');
const shortRoutes = require('./routes/shortRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const queryRoutes = require('./routes/queryRoutes');

// Importa as funções de setup ASSÍNCRONAS
const { tusServerVideoUpload } = require('./controllers/videoController');
const { createUploadRouter } = require('./routes/UploadRoutes');

async function createApp() {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Log das requisições
	app.use((req, res, next) => {
		console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
		next();
	});

	const tusServer = await tusServerVideoUpload();
	const uploadRouter = createUploadRouter(tusServer);
	app.use('/upload', uploadRouter);

	app.get('/', (req, res) => {
		res.send('API do downshift esta no ar!');
	});

	app.use('/account', authMiddleware, accountRoutes);
	app.use('/videos', videoRoutes);
	app.use('/shorts', shortRoutes);
	app.use('/playlist', playlistRoutes);
	app.use('/query', queryRoutes)

	// Middleware para tratamento de erros
	app.use((err, req, res, next) => {
		console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.stack);
		res.status(500).json({ error: 'Internal server error', details: err.message });
	});

	return app;
}

module.exports = { createApp }; 