const Minio = require('minio');

const minioClient = new Minio.Client({
	endPoint: process.env.MINIO_ENDPOINT,
	port: parseInt(process.env.MINIO_PORT || '9000'),
	useSSL: false,
	accessKey: process.env.MINIO_ACCESS_KEY,
	secretKey: process.env.MINIO_SECRET_KEY,
});

// Função para testar conecção a um bucket
const testMinIOConnection = async () => {
	const bucketName = process.env.MINIO_VIDEOS_BUCKET;
	if (!bucketName) {
		console.log('MIN_VIDEO_BUCKET não definido, pulando teste de conecção MinIO');
		return;
	}
	try {
		const exists = await minioClient.bucketExists(bucketName);
		if (exists) {
			console.log(`Conexão com MinIO bem sucedida. Bucket '${bucketName}' existe.`);
		} else {
			console.warn(`Bucket '${bucketName}' NÃO encontrado no MinIO! Verifique a criação do bucket e as permissões.`);
		}
	} catch (error) {
		console.error('Falha ao verificar bucket no MinIO:', error);
	}
};

module.exports = {
	minioClient,
	testMinIOConnection,
};