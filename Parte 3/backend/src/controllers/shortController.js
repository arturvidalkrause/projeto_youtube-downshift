const db = require('../config/db');
const { testMinIOConnection, minioClient } = require('../config/minioClient')
//const { gerarVideosCompletos } = require('../upload/compressvideos')
//const { gerarShortsCompletos } = require('../upload/compressshorts')
const { ShortUploader, VideoUploader } = require('../upload/uploadStaticContent')

/*
exports.createShortMetadata = (req, res) => {
	res.json({ 'createShortMetadata': true });
};
*/

exports.getAllShortMetadata = (req, res) => {
	res.json({ 'getAllShortMetadata': true });
};

exports.createShortMetadata = async (req, res) => {
	let resultados;
	let resultado = null;

	try {
		// Supondo que essa função retorne algo ou pelo menos resolva corretamente
		await testMinIOConnection();
		const uploadResults = await VideoUploader.store(minioClient, 1749660819901);
		reso_kbps = uploadResults.processingResults;
		metadados = uploadResults.contentMetadata;
		console.log(resultados[0])
		resultado = true;
	} catch (exception) {
		console.log("Erro ao conectar ao MinIO");
		console.error(exception);
		resultado = false;
	}

	res.json({
		Resolutions: resultados
	});
};

exports.getShortMetadataById = (req, res) => {
	res.json({ 'getShortMetadataById': true });
}