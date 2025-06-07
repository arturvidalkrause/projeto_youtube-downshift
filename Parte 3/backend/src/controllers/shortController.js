const db = require('../config/db');

exports.createShortMetadata = (req, res) => {
	res.json({ 'createShortMetadata': true });
};

exports.getAllShortMetadata = (req, res) => {
	res.json({ 'getAllShortMetadata': true });
};

exports.getShortMetadataById = (req, res) => {
	res.json({ 'getShortMetadataById': true });
}