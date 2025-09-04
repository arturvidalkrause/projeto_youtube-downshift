const { createS3Client } = require('../config/minioClient');
const { minioClient } = require('../config/minioClient');
const { ShortUploader, VideoUploader } = require('../upload/uploadStaticContent');
const db = require('../config/db');
async function tusServerVideoUpload() {
	const tus = await import('@tus/server');
	const { S3Store } = await import('@tus/s3-store');
	const { nanoid } = await import('nanoid');

	const s3Store = new S3Store({
		partSize: 8 * 1024 * 1024,
		s3ClientConfig: {
			bucket: process.env.MINIO_TEMP_BUCKET,
			region: 'us-east-1',
			endpoint: `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`,
			forcePathStyle: true,
			credentials: {
				accessKeyId: process.env.MINIO_ACCESS_KEY,
				secretAccessKey: process.env.MINIO_SECRET_KEY,
			},
		},
	});

	const tusServer = new tus.Server({
		path: '/',
		datastore: s3Store,
		namingFunction: (req) => {
			return `video-${Date.now().toString()}`;
		},
		generateUrl: (req, { id }) => {
			const protocol = 'https';
			const host = 'compilerhub.com.br';
			const path = '/api/upload/';
			const finalUrl = `${protocol}://${host}${path}${id}`;
			console.log(`[WORKAROUND CORRIGIDO] Gerando URL final: ${finalUrl}`);
			return finalUrl;
		},
	});

	tusServer.on(tus.EVENTS.POST_FINISH, async (req, res, upload) => {

		console.log('--- [PIPELINE INICIADO] ---');
		const metadata = upload.metadata || {};
		const tempFileName = upload.id;
		let contentNanoid = null;

		console.log(`[DEBUG] Arquivo: ${tempFileName}, Metadados:`, metadata);
		const { title, user_id } = metadata;
 
		try {

			console.log(`[ETAPA 1/2] Processando vídeo...`);
			const ctx = {}
			const uploadResults = await VideoUploader.store(minioClient, tempFileName, debug=1, ctx);
			contentNanoid = ctx.nanoid;
			console.log(`[DEBUG] Content id: ${ctx.nanoid}`);
			console.log(`[ETAPA 2/2] Excluindo arquivo temporário...`);
			await minioClient.removeObject(process.env.MINIO_TEMP_BUCKET, tempFileName).catch(minioErr => {
				console.error('[ERROR] Falha ao excluir o arquivo temporário:', minioErr);
			});
		} catch (error) {
			// A lógica de CATCH continua a mesma, para fazer o rollback em caso de erro.
			console.error('(X) [ERRO NO PIPELINE]:', error);
			console.log(`[ROLLBACK] Excluindo arquivo ${tempFileName} do MinIO.`);
			await minioClient.removeObject(process.env.MINIO_TEMP_BUCKET, tempFileName).catch(minioErr => {
				console.error('[ROLLBACK] Falha ao excluir do MinIO:', minioErr);
			});
		}
		console.log('--- [PIPELINE FINALIZADO] ---');
	});

	return tusServer;
}

const tusServerVideoUpload___ = async () => {
	const { S3Store } = await import('@tus/s3-store');

	const s3ClientConfig = {
		bucket: process.env.MINIO_VIDEOS_BUCKET || 'videos',
		region: 'us-east-1',
		endpoint: `http://localhost:9001/`,
		forcePathStyle: true,
		credentials: {
			accessKeyId: process.env.MINIO_ACCESS_KEY,
			secretAccessKey: process.env.MINIO_SECRET_KEY,
		},
	};

	console.log('s3ClientConfig:', s3ClientConfig);
	const s3Store = new S3Store({
		partSize: 8 * 1024 * 1024,
		s3ClientConfig: s3ClientConfig,
	});

	return s3Store;
};


// Criar metadados para um novo video
const createVideoMetadata = async (req, res) => {
	const { title, user_id } = req.body;
	console.log('[TESTE] Recebida requisição para criar metadados.');

	// Validação básica
	if (!title || !user_id) {
		return res.status(400).json({ error: 'Título e ID do usuário são obrigatórios.' });
	}

	// Gera um ID aleatório para tornar o teste mais realista
	const mockId = Math.floor(Math.random() * 10000) + 1;
	console.log(`[TESTE] Simulando criação de metadados.ID gerado: ${mockId}`);

	res.status(201).json({
		message: 'Metadados criados com sucesso (SIMULAÇÃO)!',
		id: mockId, // Retorna o ID aleatório
	});
};

// ========================================================================
// UPLOAD DO ARQUIVO (SIMULADO)
// ========================================================================
const uploadVideoFile = async (req, res) => {
	const { id } = req.params;
	const videoFile = req.file;

	if (!videoFile) {
		return res.status(400).json({ error: 'Nenhum arquivo de vídeo enviado.' });
	}

	// Log detalhado no console para confirmar o recebimento
	console.log('----------------------------------------------------');
	console.log(`✅ VERIFICAÇÃO DE UPLOAD PARA O ID DE CONTEÚDO: ${id} `);
	console.log(`-> Arquivo recebido: ${videoFile.originalname} `);
	console.log(`-> Tipo do arquivo: ${videoFile.mimetype}`);
	console.log(`-> Tamanho: ${(videoFile.size / 1024 / 1024).toFixed(2)} MB`);
	console.log('-> Lógica de Banco de Dados e MinIO pulada para fins de teste.');
	console.log('----------------------------------------------------');

	// Envia uma resposta de sucesso simples
	try {
		res.status(200).json({
			message: 'Teste de envio bem-sucedido! O arquivo foi recebido pelo backend.',
			fileName: videoFile.originalname,
			fileSizeInBytes: videoFile.size
		});
	} catch (error) {
		console.error("Erro ao enviar resposta para o cliente:", error);
		res.status(500).json({ error: 'Falha ao enviar resposta do servidor.' });
	}
};

// Listar todos os metadados de videos
const getAllVideosMetadata = async (req, res) => {
	try {
		const queryText = `
      SELECT
          v.content_nanoid AS id,
          ct._title AS title,
          ct._description AS description,
          ct._thumbnail_url AS thumbnail_url,
          ch._name AS channel_name,
          u._name AS user_name,
          ct._created_at AS created_at
      FROM
          video_T AS v
      JOIN
          content_T AS ct ON v.content_nanoid = ct.nanoid
      JOIN
          channel_T AS ch ON ct.channel_nanoid = ch.nanoid
      JOIN
          user_T AS u ON ch.user_nanoid = u.nanoid
      ORDER BY
          ct._created_at DESC 
	  LIMIT 20;
    `;
		const { rows } = await db.query(queryText);
		res.status(200).json(rows);
	} catch (error) {
		console.error('Erro ao buscar metadados dos vídeos:', error);
		res.status(500).json({ error: 'Falha ao buscar metadados dos vídeos.' });
	}
};

// Busca metadados de um video especifico pelo ID
const getVideoMetadataById = async (req, res) => {
	const { id } = req.params; // Este ID é o content_id
	try {
		const queryText = `
	SELECT
	c.content_id AS id,
		c.cont_title AS title,
			c.cont_desc AS description,
				ch.users_id AS user_id,
					c.cont_created_at AS created_at
	FROM
                video AS v
	JOIN
                content AS c ON v.content_id = c.content_id
	JOIN
                channel AS ch ON c.channel_id = ch.channel_id
            WHERE c.content_id = $1;
	`;
		const { rows } = await db.query(queryText, [id]);
		if (rows.length === 0) {
			return res.status(404).json({ error: 'Vídeo não encontrado.' });
		}
		res.status(200).json(rows[0]);
	} catch (error) {
		console.error('Erro ao buscar metadados do vídeo por ID:', error);
		res.status(500).json({ error: 'Falha ao buscar metadados do vídeo.' });
	}
};

module.exports = {
	tusServerVideoUpload,
	// uploadVideoFile,
	getAllVideosMetadata,
	getVideoMetadataById,
};