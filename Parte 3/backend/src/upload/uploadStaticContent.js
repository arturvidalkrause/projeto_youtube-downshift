// Para suportar os arquivos com moov atom errado, só baixando. Implementei isso.
// O nanoid do conteúdo já tá sendo gerado automaticamente aqui.

const fs = require('fs');
const path = require('path');
const { PassThrough } = require('stream');
const async = require('async');
const ffmpeg = require('fluent-ffmpeg');
const { getResolutionsFromDB } = require('./requestResolutions');
const { sendProgress, closeConnection } = require('../services/progressUpdates');

class ContentUploader {
	#fileName;
	#duration;
	#isVertical;
	#height;
	#width;
	#resolutions;
	#type;
	#minioClient;
	#nanoid;

	constructor(minioClient, fileName) {
		this.#minioClient = minioClient;
		this.#fileName = fileName;
		this.#duration = null;
		this.#isVertical = null;
		this.#height = null;
		this.#width = null;
		this.#resolutions = null;
		this.#type = null;
		this.#nanoid = null;
	}

	static async store(minioClient, fileName, debug = 0, context={}) {
		const { nanoid } = await import('nanoid');
		const instance = new this(minioClient, fileName);
		instance.nanoid = nanoid();
		context.nanoid = instance.nanoid;
		instance.resolutions = await instance._getResolutions();
		const results = await instance.#store(debug);
		return {
			processingResults: results,
			contentMetadata: instance.toJson()
		};
	}

	get nanoid() { return this.#nanoid; }
	set nanoid(nid) { this.#nanoid = nid; }

	get fileName() { return this.#fileName; }
	get minioClient() { return this.#minioClient; }

	get duration() { return this.#duration; }
	set duration(d) { this.#duration = d; }

	get type() { return this.#type; }
	set type(t) { this.#type = t; }

	get isVertical() { return this.#isVertical; }
	set isVertical(isV) { this.#isVertical = isV; }

	get height() { return this.#height; }
	set height(h) { this.#height = h; }

	get width() { return this.#width; }
	set width(w) { this.#width = w; }

	get resolutions() { return this.#resolutions; }
	set resolutions(resolutions_) { this.#resolutions = resolutions_; }

	async _getPossibleResolutions() {
		if (this.type == null) return null;
		return await getResolutionsFromDB(this.type, this.isVertical, 0);
	}

	async _getResolutions(debug = 0) {
		if (debug > 0) console.log("Started getting resolutions");
		const possible = await this._getPossibleResolutions();
		if (debug > 1) console.log(JSON.stringify(possible))
		if (!possible || possible == null || possible.length === 0) throw new Error("resolution not suported.");
		let filtered = possible.filter(res => res <= this.height);
		if (debug > 1) {
			console.log("Retorno do PSQL:", possible);
			console.log("Retorno do PSQL (stringify):", JSON.stringify(possible));
			possible.forEach((val, i) => {
				console.log(`possible[${i}] = ${val} (tipo: ${typeof val})`);
			});
			console.log(`Resolution: ${this.height}`);
		}
		if (filtered.length === 0) filtered = [possible[0]];
		if (debug > 1) console.log(`Filtered: ${filtered}`);
		return filtered;
	}

	toString() { return `${this.constructor.name}(type: ${this.#type}, file_name: ${this.fileName}, content_duration: ${this.duration})`; }

	toJson() {
		return {
			nanoid: this.nanoid,
			type: this.type,
			content_file_name: this.fileName,
			duration: this.duration,
			is_vertical: this.isVertical,
			original_height: this.height,
			original_width: this.width,
			resolutions: this.resolutions
		};
	}

	#store() { throw new Error("#store() not implemented."); }
}

class StaticContentUploader extends ContentUploader {
	#outputBucket

	constructor(minioClient, fileName) {
		super(minioClient, fileName);
		this.#outputBucket = null;
	}

	static async store(minioClient, fileName, debug = 0, context = {}) {
		const { nanoid } = await import('nanoid');
		const instance = new this(minioClient, fileName);
		instance.nanoid = nanoid();
		context.nanoid = instance.nanoid;
		const { height, width, duration } = await instance.#getMetadataFromTemp();
		instance.isVertical = (height > width);
		instance.height = height;
		instance.width = width;
		instance.duration = duration;
		instance.resolutions = await instance._getResolutions();
		const results = await instance.#store(debug);
		return {
			processingResults: results,
			contentMetadata: instance.toJson()
		};
	}

	get outputBucket() { return this.#outputBucket; }
	set outputBucket(outBucket) { this.#outputBucket = outBucket; }

	async #getMetadataFromTemp() {
		return new Promise(async (resolve, reject) => {
			try {
				const stream = await this.minioClient.getObject('temp', `${this.fileName}`);
				ffmpeg.ffprobe(stream, (err, metadata) => {
					if (err) return reject(new Error(`FFprobe error for content fileName${this.fileName}: ${err.message}`));
					const contentStream = metadata.streams.find(s => s.codec_type === 'video');
					if (!contentStream) {
						return reject(new Error(`No video stream found for content fileName${this.fileName}.`));
					}
					if (typeof contentStream.height === 'undefined' || typeof contentStream.width === 'undefined' || typeof metadata.format.duration === 'undefined') {
						return reject(new Error(`Missing essential metadata (height, width, or duration) for content fileName${this.fileName}. Video stream info: ${JSON.stringify(contentStream)}, Format info: ${JSON.stringify(metadata.format)}`));
					}
					resolve({ height: contentStream.height, width: contentStream.width, duration: metadata.format.duration });
				});
			} catch (err) {
				reject(new Error(`Error getting object '${this.fileName}' from MinIO 'temp' bucket: ${err.message}`));
			}
		});
	}

	async #store(debug = 0) {
		if (this.type == null) {
			throw new Error(`Content type is null for content fileName${this.fileName}. Cannot store.`);
		}
		if (this.outputBucket == null) {
			throw new Error(`Output bucket is null for content fileName${this.fileName}. Cannot store.`);
		}
		const jobTempDir = path.join(__dirname, `temp-job-${this.fileName}`);
		const localSourcePath = path.join(jobTempDir, `source-${this.fileName}`);
		const runningCommands = []; // Array para rastrear os comandos ffmpeg em execução

		try {
			if (debug > 0) console.log(`Started processing content ${this.fileName} (${this.type})`);
			if (fs.existsSync(jobTempDir)) fs.rmSync(jobTempDir, { recursive: true, force: true });
			fs.mkdirSync(jobTempDir, { recursive: true });

			// --- MUDANÇA: Baixar o arquivo do Minio para o disco local primeiro ---
			if (debug > 0) console.log(`Downloading source file from Minio to ${localSourcePath}...`);
			await this.minioClient.fGetObject('temp', this.fileName, localSourcePath);
			if (debug > 0) console.log('Download complete.');

			if (debug > 0) {
				console.log(`Original resolution: ${this.height}x${this.width}`);
				console.log(`Content duration: ${this.duration ? this.duration.toFixed(2) + 's' : 'N/A'}`);
				console.log(`Processing to [${this.resolutions.join('p, ')}p]`);
			}
			const mainInputStream = await this.minioClient.getObject('temp', `${this.fileName}`);
			const passThroughStreams = {};
			this.resolutions.forEach(r => {
				const pt = new PassThrough();
				mainInputStream.pipe(pt);
				passThroughStreams[r] = pt;
			});

			const processingResults = [];
			await async.eachLimit(this.resolutions, 8, async (resolution) => {
				const tempFilePath = path.join(jobTempDir, `${this.fileName}[${resolution}].mp4`);
				const minioPath = `${this.nanoid}/${resolution}.mp4`;
				await new Promise((resolve, reject) => {
					const command = ffmpeg(localSourcePath)
						.inputOption('-fflags +genpts') 
						.videoCodec('libx264')
						.audioCodec('aac')
						.size(`?x${resolution}`)
						.outputOptions([
							'-preset superfast', 
							'-crf 28', 
							'-threads 3', 
							'-tune fastdecode', 
							'-movflags +faststart',
							'-pix_fmt yuv420p'
						])
						.format('mp4')
						.save(`${tempFilePath}`)
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
							sendProgress(this.nanoid, { type: 'error', message: err.message });
							closeConnection(this.nanoid);
							reject(err);
						})

					runningCommands.push(command);
					
					if (resolution=== this.resolutions[0]) 
						command.on('progress', (info) => {
						const [hh, mm, ss] = info.timemark.split(':');
						const currentTime = parseInt(hh) * 3600 + parseInt(mm) * 60 + parseFloat(ss);
						const percent = (currentTime / this.duration) * 100;
						if (debug > 1) console.log(`${this.nanoid}: ${parseFloat(percent.toFixed(2))}%`)
						sendProgress(this.nanoid, { type: 'progress', percent: parseFloat(percent.toFixed(2)) });
						});
				});
				if (debug > 1) console.log(`[NET-${resolution}p] Starting uploading ${tempFilePath}`);
				await this.minioClient.fPutObject(this.outputBucket, minioPath, tempFilePath, { 'Type': 'video/mp4' });
				if (debug > 1) console.log(`[NET-${resolution}p] Finished uploading to ${resolution}.mp4.`);
			});

			if (debug > 0) console.log(`Processing content ${this.fileName}: sucessfull`);
			sendProgress(this.nanoid, { type: 'complete' });
			closeConnection(this.nanoid);

			return processingResults;
		} catch (err) {
			console.error(`\nProcessing content ${this.fileName}:`, err);
			console.log('An error occurred. Terminating all running ffmpeg processes...');
			runningCommands.forEach(cmd => {
				try {
					cmd.kill('SIGKILL');
				} catch (e) {
					console.error('Failed to kill a command, it might have already finished.', e.message);
				}
			});
			throw err;
		} finally {
			if (fs.existsSync(jobTempDir)) {
				if (debug > 0) console.log('Cleaning...');
				try {
					fs.rmSync(jobTempDir, { recursive: true, force: true });
					fs.rmSync(localSourcePath, { recursive: true, force: true });
					if (debug > 0) console.log('Temporary directory removed successfully.');
				} catch (cleanupErr) {
					console.error('Error during final cleanup:', cleanupErr.message);
				}
			}
			if (debug > 0) console.log('Finished');
		}
	}
}

class VideoUploader extends StaticContentUploader {
	constructor(minioClient, fileName) {
		super(minioClient, fileName);
		this.outputBucket = 'videos';
		this.type = 'video';
	}
}

class ShortUploader extends StaticContentUploader {
	constructor(minioClient, fileName) {
		super(minioClient, fileName);
		this.outputBucket = 'shorts';
		this.type = "short";
	}
}

module.exports = { ShortUploader, VideoUploader };
