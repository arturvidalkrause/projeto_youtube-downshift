const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.DATABASE_USER,
	host: process.env.DATABASE_HOST,
	database: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASSWORD,
	port: parseInt(process.env.DATABASE_PORT || '5432'),
});

pool.on('connect', (client) => {
	console.log('Success connect to postgreSQL!');

	// seta o search_path para o schema downshift
	client.query('SET search_path TO downshift;')
		.then(() => {
			console.log('Default schema set to "downshift".');
		})
		.catch(err => {
			console.error('Error setting default schema:', err);
		});
});

pool.on('error', (err) => {
	console.error('Erro inesperado no cliente do banco de dados ocioso', err);
	process.exit(-1);
});

// Função para testar a coneção
const testConnection = async () => {
	try {
		const client = await pool.connect();
		console.log('Teste de conecção com postgreSQL bem sucedido');
		await client.query('SELECT NOW()');
		client.release();
		console.log('Pig para PostgreSQL bem sucedido');
	} catch (error) {
		console.log('Falha ao conectar/pingar PostgreSQL:', error);
	}
};

module.exports = {
	query: (text, params) => pool.query(text, params),
	pool,
	testConnection,
};
