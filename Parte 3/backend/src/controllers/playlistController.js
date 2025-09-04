const db = require('../config/db');

exports.createPlaylistMetadata = (req, res) => {
	res.json({ 'createPlaylistMetadata': true });
};

exports.getAllPlaylistMetadata = (req, res) => {
	res.json({ 'getAllPlaylistMetadata': true });
};

exports.getPlaylistMetadataById = (req, res) => {
	res.json({ 'getPlaylistMetadataById': true });
}