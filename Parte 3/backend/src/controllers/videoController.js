const db = require('../config/db');

// Criar metadados para um novo video
exports.createVideoMetadata = async (req, res) => {
	const { title, description, user_id /* adicionar o restante */ } = req.body;
	// Adicionar validação dos dados recebidos do cliente

	if (!title || !user_id) {
		return res.status(400).json({ error: 'Título e user_id são obrigatórios.' });
	}

	try {
		const queryText = `
		INSERT INTO videos (title, description, user_id, created_at, updated_at)
		VALUES ($1, $2, $3, NOW, NOW)
		RETURNING *;`
		// Substitua 'videos' e as colunas pelos nomes corretos da sua tabela
		// Certifique-se que a tabela 'videos' e as colunas 'title', 'description', 'user_id' existem

		const values = [title, description, user_id];
		const { rows } = await db.query(queryText, values);
		res.status(201).json(rows[0]);
	} catch (error) {
		console.error('Erro ao criar metadados do vídeo:', error);
		res.status(500).json({ error: 'Falha ao criar metadados do vídeo.' });
	}
};

// Listar todos os metadados de videos
exports.getAllVideosMetadata = async (req, res) => {
	try {
		const queryText = `
SELECT
    c.content_id AS id,
    c.cont_title AS title,
    c.cont_desc AS description,
    ch.users_id AS user_id,
    c.cont_created_at AS created_at
FROM
    downshift.video AS v
JOIN
    downshift.content AS c ON v.content_id = c.content_id
JOIN
    downshift.channel AS ch ON c.channel_id = ch.channel_id
ORDER BY
    c.cont_created_at DESC;
`;
		// Substitua 'videos' e as colunas pelos nomes corretos
		const { rows } = await db.query(queryText);
		// const formattedJsonString = JSON.stringify(rows, null, 2);
		// // res.setHeader('Conte')
		// res.status(200).send(`<pre>${formattedJsonString}</pre>`);
		res.status(200).json(rows);
	} catch (error) {
		console.error('Erro ao buscar metadados dos vídeos:', error);
		res.status(500).json({ error: 'Falha ao buscar metadados dos vídeos.' });
	}
}

// Busca metadados de um video especifico pelo ID
exports.getVideoMetadataById = async (req, res) => {
	const { id } = req.params;
	try {
		const queryText = 'SELECT id, title, description, user_id, created_at FROM videos WHERE id = $1;';
		// Substitua 'videos' e as colunas pelos nomes corretos
		const { rows } = await db.query(queryText, [id]);
		if (rows.length === 0) {
			return res.status(404).json({ error: 'Metadados não encontrados.' });
		}
		res.status(200).json(rows[0]);
	} catch (error) {
		console.error('Erro ao buscar metadados do vídeo por ID:', error);
		res.status(500).json({ error: 'Falha ao buscar metadados do vídeo.' });
	}
}


// Aqui você adicionaria funções para upload de arquivo para o MinIO,
// e depois atualizaria o registro no PostgreSQL com o caminho do arquivo.
// Exemplo (muito simplificado) de como usar o cliente MinIO:
/*
const { minioClient } = require('../config/minioClient');
exports.uploadVideoFile = async (req, res) => {
	// ... (usar multer para pegar o arquivo req.file) ...
	const bucketName = process.env.MINIO_VIDEOS_BUCKET;
	const fileNameInMinio = `videos/${Date.now()}_${req.file.originalname}`;

	try {
		await minioClient.putObject(bucketName, fileNameInMinio, req.file.buffer, req.file.mimetype);
		// Depois de fazer o upload, salve fileNameInMinio no seu banco de dados PostgreSQL
		// associado ao ID do vídeo.
		res.status(200).json({ message: 'Upload bem-sucedido!', filePath: fileNameInMinio });
	} catch (error) {
		console.error('Erro ao fazer upload para o MinIO:', error);
		res.status(500).json({ error: 'Falha no upload do vídeo.' });
	}
};
*/