const Minio = require('minio');

const minioClient = new Minio.Client({
	endPoint: process.env.MINIO_ENDPOINT,
	port: parseInt(process.env.MINIO_PORT || '9000'),
	useSSL: false,
	accessKey: process.env.MINIO_ACCESS_KEY,
	secretKey: process.env.MINIO_SECRET_KEY,
});

// async function createS3Client() { // Você pode manter o nome 'createS3Client'
// 	// Retorna um objeto que simula a interface que @tus/s3-store espera do S3Client do AWS SDK.
// 	return {
// 		// O método 'send' é o principal método de comunicação do AWS SDK v3.
// 		// Precisamos implementá-lo para que ele use o minioClient.
// 		send: async (command) => {
// 			// console.log("DEBUG: S3ClientForTus received command:", command.constructor.name);

// 			// A 'region' pode ser acessada aqui, mas o principal é a operação.
// 			// Para o @tus/s3-store, as principais operações são PutObject, UploadPart, CompleteMultipartUpload, etc.
// 			// O 'command' será uma instância de um comando do AWS SDK (e.g., PutObjectCommand).

// 			// Esta é uma implementação simplificada.
// 			// Você pode precisar adicionar mais lógica para outros comandos TUS se encontrar erros.
// 			if (command.constructor.name === 'PutObjectCommand') {
// 				const { Bucket, Key, Body, ContentLength, ContentType, Metadata } = command.input;
// 				// console.log(`DEBUG: PutObjectCommand - Bucket: ${Bucket}, Key: ${Key}, Size: ${ContentLength}`);
// 				await minioClient.putObject(Bucket, Key, Body, ContentLength, {
// 					'Content-Type': ContentType,
// 					// Converter Metadata do AWS SDK para o formato do MinIO (se necessário)
// 					...Metadata
// 				});
// 				return { ETag: 'mock-etag' }; // Retorno esperado pelo @tus/s3-store
// 			} else if (command.constructor.name === 'CreateMultipartUploadCommand') {
// 				const { Bucket, Key, ContentType, Metadata } = command.input;
// 				// console.log(`DEBUG: CreateMultipartUploadCommand - Bucket: ${Bucket}, Key: ${Key}`);
// 				const uploadId = await minioClient.initiateMultipartUpload(Bucket, Key, {
// 					'Content-Type': ContentType,
// 					// Converter Metadata do AWS SDK para o formato do Minio
// 					...Metadata
// 				});
// 				return { UploadId: uploadId };
// 			} else if (command.constructor.name === 'UploadPartCommand') {
// 				const { Bucket, Key, PartNumber, UploadId, Body, ContentLength } = command.input;
// 				// console.log(`DEBUG: UploadPartCommand - Bucket: ${Bucket}, Key: ${Key}, Part: ${PartNumber}`);
// 				const etag = await minioClient.fPutObject(Bucket, Key, Body, ContentLength, { // Use fPutObject aqui se Body for um caminho de arquivo
// 					'partNumber': PartNumber,
// 					'uploadId': UploadId
// 				});
// 				return { ETag: etag };
// 			} else if (command.constructor.name === 'CompleteMultipartUploadCommand') {
// 				const { Bucket, Key, UploadId, MultipartUpload } = command.input;
// 				// console.log(`DEBUG: CompleteMultipartUploadCommand - Bucket: ${Bucket}, Key: ${Key}`);
// 				// MultipartUpload.Parts é um array de { PartNumber, ETag }
// 				// Minio.Client.completeMultipartUpload espera um array de ETags
// 				const etags = MultipartUpload.Parts.map(part => part.ETag);
// 				await minioClient.completeMultipartUpload(Bucket, Key, UploadId, etags);
// 				return {}; // Retorno esperado
// 			} else if (command.constructor.name === 'AbortMultipartUploadCommand') {
// 				const { Bucket, Key, UploadId } = command.input;
// 				// console.log(`DEBUG: AbortMultipartUploadCommand - Bucket: ${Bucket}, Key: ${Key}`);
// 				await minioClient.abortMultipartUpload(Bucket, Key, UploadId);
// 				return {};
// 			}
// 			// Adicione outros comandos do S3 SDK que @tus/s3-store possa usar (GetObjectCommand, HeadObjectCommand)
// 			// Se você vir erros de "command not implemented", você terá que adicionar o tratamento aqui.
// 			else if (command.constructor.name === 'HeadObjectCommand') {
// 				const { Bucket, Key } = command.input;
// 				// console.log(`DEBUG: HeadObjectCommand - Bucket: ${Bucket}, Key: ${Key}`);
// 				try {
// 					const stat = await minioClient.statObject(Bucket, Key);
// 					return {
// 						ContentLength: stat.size,
// 						ContentType: stat.metaData['content-type'],
// 						LastModified: stat.lastModified,
// 						// TUS espera um ETag para verificar integridade/resumo
// 						ETag: stat.etag // Certifique-se de que o MinIO retorna um etag que é compatível com o S3
// 					};
// 				} catch (e) {
// 					if (e.code === 'NotFound') {
// 						// Simula um erro 404 do S3 SDK para objeto não encontrado
// 						const notFoundError = new Error('Not Found');
// 						notFoundError.name = 'NotFound';
// 						throw notFoundError;
// 					}
// 					throw e;
// 				}
// 			}
// 			// Se o comando não for suportado, lance um erro.
// 			throw new Error(`Unsupported S3 command for TUS adapter: ${command.constructor.name}`);
// 		},
// 		// O @tus/s3-store pode tentar acessar client.config.region.
// 		// Embora não seja usado pelo nosso minioClient, o @tus/s3-store ainda pode tentar ler isso.
// 		// Forçamos a região a ser uma string aqui.
// 		config: {
// 			region: 'us-east-1', // Uma região dummy, mas é uma STRING, não uma função.
// 		},
// 		// Adicione outras propriedades/métodos se o @tus/s3-store os esperar (menos comum)
// 	};
// }


// backend/src/config/minioClient.js

// Deixamos apenas a função que cria o cliente que o TUS precisa.
// Isso evita a complexidade do adaptador.

const { createS3Client } = require('../config/minioClient');

const tusServerVideoUpload = async () => {
	// Dynamically import S3Store from @tus/s3-store
	const { S3Store } = await import('@tus/s3-store');

	// Create S3 client using the configured minioClient
	const s3Client = await createS3Client();

	// Define s3ClientConfig with the S3 client and bucket
	const s3ClientConfig = {
		client: s3Client,
		bucket: process.env.MINIO_TEMP_BUCKET || 'temp',
	};

	// console.log('s3ClientConfig:', s3ClientConfig); // Debug log
	const s3Store = new S3Store(s3ClientConfig); // Pass the entire object

	// Return the store for TUS server setup
	return s3Store;
};



// Função para testar conecção a um bucket
const testMinIOConnection = async () => {
	const bucketNames = [process.env.MINIO_VIDEOS_BUCKET, process.env.MINIO_SHORTS_BUCKET, process.env.MINIO_LIVES_BUCKET, process.env.MINIO_IMAGES_BUCKET, process.env.MINIO_TEMP_BUCKET];

	for (const bucketName of bucketNames) {
		if (!bucketName) {
			console.log(`${bucketName} não definido, pulando teste de conecção MinIO`);
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
	}
};

module.exports = {
	minioClient,
	createS3Client,
	testMinIOConnection,
};