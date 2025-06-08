const db = require('../config/db');
const { testMinIOConnection, minioClient } = require('../config/minioClient')
//const { gerarVideosCompletos } = require('../upload/compressvideos')
//const { gerarShortsCompletos } = require('../upload/compressshorts')
const { Short } = require('../upload/uploadStaticContent')

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
		const short = await Short.create(minioClient, 6969, 30.00, true);
		resultados = await short.store(true);
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