const fs = require('fs');
const path = require('path');
const { PassThrough } = require('stream');
const ffmpeg = require('fluent-ffmpeg');
const async = require('async');
const { getResolutionsFromDB } = require('./requestResolutions')

class Content {
	#client;
	#id;
	#duration;
	#isVertical;
	#height;
    #resolutions;
    #type;

	constructor(minioClient, id, duration, isVertical) {
		this.#client = minioClient;
		this.#id = id;
		this.#duration = duration;
		this.#isVertical = isVertical;
		this.#height = null;
        this.#resolutions = null;
        this.#type = null;
	}

    static async create(minioClient, id, duration, isVertical) {
		const instance = new this(minioClient, id, duration, isVertical);
        instance.resolutions = await instance._getResolutions();
        return instance;
	}

	get client() { return this.#client; }
	get id() { return this.#id; }
	get duration() { return this.#duration; }
	get type() { return this.#type; }
    set type(t) { this.#type = t; }

	get isVertical() { return this.#isVertical; }
	get height() { return this.#height; }
	set height(h) { this.#height = h; }

    get resolutions() { return this.#resolutions; }
    set resolutions(resolutions_) { this.#resolutions = resolutions_; }
	
    async _getPossibleResolutions() {
        if (this.type == null) return null;
        return await getResolutionsFromDB(this.type, this.isVertical);
    }

    async _getResolutions() {
        const possible = await this._getPossibleResolutions();
        if (possible == null || possible.length === 0) return [];

        const filtered = possible.filter(res => res <= this.height);
        if (filtered.length === 0) return [possible[0]];
        return filtered;
    }

	toString() { return `${this.type}(id: ${this.id}, duration: ${this.duration})`; }

	store() { throw new Error("store() not implemented."); }
}

class StaticContent extends Content {
	#outputBucket

	constructor(minioClient, id, duration, isVertical) {
		super(minioClient, id, duration, isVertical);
		this.#outputBucket = null;
	}

    static async create(minioClient, id, duration, isVertical) {
		const instance =  new this(minioClient, id, duration, isVertical);
        instance.height = await instance.#getHeightFromTemp();
        instance.resolutions = await instance._getResolutions();
        return instance;
	}

	get outputBucket() { return this.#outputBucket; }
	set outputBucket(outBucket) { this.#outputBucket = outBucket; }

	async #getHeightFromTemp() {
		return new Promise(async (resolve, reject) => {
			try {
				const stream = await this.client.getObject('temp', `content-${this.id}`);
				ffmpeg.ffprobe(stream, (err, metadata) => {
					if (err) return reject(new Error(`ffprobe error: ${err.message}`));
					const contentStream = metadata.streams.find(s => s.codec_type === 'video');
					if (!contentStream || !contentStream.height) {
						return reject(new Error('Stream or height not found.'));
					}
					resolve(contentStream.height);
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	async store(verbose = false) {
		if (this.type == null || this.outputBucket == null) return null;
		const jobTempDir = path.join(__dirname, `temp-job-${this.id}`);
		try {
			if (verbose) console.log(`Started processing content ${this.id} (${this.type})`);
			if (fs.existsSync(jobTempDir)) fs.rmSync(jobTempDir, { recursive: true, force: true });
			fs.mkdirSync(jobTempDir, { recursive: true });
			if (verbose) {
				console.log(`Original resolution: ${this.height}`);
				console.log(`Processing to ${this.resolutions.join(', ')}p}`);
			}
			const mainInputStream = await this.client.getObject('temp', `content-${this.id}`);
			const passThroughStreams = {};
            this.resolutions.forEach(r => {
				const pt = new PassThrough();
				mainInputStream.pipe(pt);
				passThroughStreams[r] = pt;
			});

			const processingResults = [];

			await async.eachLimit(this.resolutions, 8, async (resolution) => {
				const tempFilePath = path.join(jobTempDir, `${resolution}.mp4`);
				const minioPath = `${this.id}/${resolution}.mp4`;

				await new Promise((resolve, reject) => {
					ffmpeg(passThroughStreams[resolution])
						.videoCodec('libx264')
						.audioCodec('aac')
						.size(`?x${resolution}`)
						.outputOptions(['-preset superfast', '-crf 28', '-threads 3', '-tune fastdecode', '-movflags +faststart'])
						.format('mp4')
						.save(tempFilePath)
						.on('end', (stdout, stderr) => {
							try {
								const bitrateMatch = stderr.match(/kb\/s\s*:\s*(\d+\.?\d*)/);
								const bitrate = bitrateMatch && bitrateMatch[1] ? `${parseFloat(bitrateMatch[1]).toFixed(2)} kb/s` : 'N/A';
								processingResults.push({ resolution: `${resolution}p`, bitrate });
								resolve();
							} catch (e) {
								processingResults.push({ resolution: `${resolution}p`, bitrate: 'Error' });
								resolve();
							}
						})
						.on('error', (err) => {
							console.error(`Error in [${resolution}p]:`, err.message);
							reject(err);
						});
				})
				if (verbose) console.log(`[NET-${resolution}p] Starting uploading ${tempFilePath}`);
				await this.client.fPutObject(this.outputBucket, minioPath, tempFilePath, { 'Content-Type': 'video/mp4' });
				if (verbose) console.log(`[NET-${resolution}p] Finished uploading to ${resolution}.mp4.`);
			});

			if (verbose) console.log(`Processing content ${this.id}: sucessfull`);
			return processingResults;
		} catch (err) {
			console.error(`\n Processing content ${this.id}:`, err);
			throw err;
		} finally {
			if (fs.existsSync(jobTempDir)) {
				if (verbose) console.log('Cleaning...');
				fs.rmSync(jobTempDir, { recursive: true, force: true });
			}
			if (verbose) console.log('Finished');
		}
	}
}

class Live extends Content {
    constructor(minioClient, id, duration, isVertical){
        super(minioClient, id, duration, isVertical);
        this.type = 'live';
    }
}

class Video extends StaticContent {
	constructor(minioClient, id, duration, isVertical) {
		super(minioClient, id, duration, isVertical);
		this.outputBucket = 'videos';
        this.type = 'video';
	}
}

class Short extends StaticContent {
	constructor(minioClient, id, duration, isVertical) {
		super(minioClient, id, duration, isVertical);
		this.outputBucket = 'shorts';
        this.type = "short";
	}
}

module.exports = { Live, Short, Video };