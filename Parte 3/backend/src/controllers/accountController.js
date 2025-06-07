const db = require('../config/db');

exports.createAccountMetadata = (req, res) => {
	res.json({ 'createAccountMetadata': true });
};

exports.getAccountMetadataById = (req, res) => {
	res.json({ 'getAccountMetadataById': true });
};