const multer = require('multer');

// Configura o armazenamneto para a memoria
const storage = multer.memoryStorage();

const max_size_mb = parseInt(process.env.UPLOAD_MAX_SIZE_MB, 10) || 2048;

const uploadVideo = multer({
	storage: storage,
	limits: {
		fileSize: 2048 * 1024 * 1024
	}
});

module.exports = {
	uploadVideo,
};