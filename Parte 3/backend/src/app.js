const express = require('express');
const accountRoutes = require('./routes/accountRoutes');
const videoRoutes = require('./routes/videoRoutes');
const shortRoutes = require('./routes/shortRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('API do downshift esta no ar!');
});

app.use('/account/', accountRoutes);
app.use('/videos/', videoRoutes);
app.use('/shorts/', shortRoutes);
app.use('/playlist/', playlistRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({ error: 'Algo deu errado no servidor!' });
});

module.exports = app;