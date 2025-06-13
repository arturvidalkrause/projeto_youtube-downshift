const fs = require('fs');
const path = require('path');
const { PassThrough } = require('stream');
const ffmpeg = require('fluent-ffmpeg');
const async = require('async');
const { getResolutionsFromDB } = require('./requestResolutions')

class Content {
	#channelId;
	#indRatingId;
	#languageId;
	#selfId;
	#creationTimestamp;
	#statusId;
	#duration;
	#resolutionId;
	#categoryId;
	#URL;
	#title;
	#description;
	#tagIds;
	#tempPath;
	#selfPath;
	#thumbPath;

	constructor(channelId, indRatingId, languageId, statusId, categoryId, title, description, tagIds) {
		this.#creationTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
		this.#channelId = channelId;
		this.#indRatingId = indRatingId;
		this.#languageId = languageId;
		this.#statusId = statusId;
		this.#categoryId = categoryId;
		this.#title = title;
		this.#description = description;
		this.#tagIds = tagIds;
	}

	#createSQL() {

	}




}