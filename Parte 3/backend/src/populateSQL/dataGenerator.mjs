// V1.4.8 - Final Interaction and Tag Fix
import { nanoid } from 'nanoid';
import * as fs from 'fs';

class Rand {
	static randomTimestamp() {
		const now = new Date();
		const millisInMonth = 2592000000;
		const offset = Math.floor(Math.random() * millisInMonth * 2) - millisInMonth;
		return new Date(now.getTime() + offset).toISOString().slice(0, 19).replace('T', ' ');
	}
	static sampleWithoutRepeat(array, num_elements) {
		if (num_elements > array.length) {
			num_elements = array.length;
		}
		const copy = [...array];
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[copy[i], copy[j]] = [copy[j], copy[i]];
		}
		return copy.slice(0, num_elements);
	}
	static smallSampleWithoutRepeat(array, num_elements) {
		if (num_elements > array.length) {
			num_elements = array.length;
		}
		const result = new Set();
		while (result.size < num_elements) {
			const randomIndex = Math.floor(Math.random() * array.length);
			result.add(array[randomIndex]);
		}
		return [...result];
	}
	static sampleWithRepeat(array, num_elements) {
		const result = [];
		for (let i = 0; i < num_elements; i++) {
			const randomIndex = Math.floor(Math.random() * array.length);
			result.push(array[randomIndex]);
		}
		return result;
	}
	static randomInt(low, high) {
		return Math.floor(Math.random() * (high - low)) + low;
	}

	static generateRandomString(length) {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return result;
	}
}

class SQLGenerator {
	constructor(relation, keyList, valueList, conflictString) {
		this.relation = relation;
		if (!valueList || valueList.length === 0) {
			this.fullQuery = `-- No data to generate for table: ${this.relation}\n`;
			this.values = '';
			return;
		}
		this.queryInit = `INSERT INTO ${relation} (${keyList.join(', ')})\nVALUES\n`;
		this.values = this.#SQLfyValues(valueList);
		this.queryEnd = `\nON CONFLICT (${conflictString}) DO NOTHING;`;
		this.fullQuery = `${this.queryInit}${this.values}${this.queryEnd}`;
	}
	#SQLfyValues(valueList) {
		return valueList.map(line => {
			const treated = line.map((item) => {
				if (item === null) return 'NULL';
				if (typeof item === 'boolean' || typeof item === 'number') return item;
				return `'${item.toString().replace(/'/g, "''")}'`;
			});
			return `(${treated.join(', ')})`;
		}).join(",\n");
	}
	exportSQL() {
		return this.fullQuery;
	}
}

class UpdateGenerator {
	constructor(relation, updateClauseList) {
		this.relation = relation;
		this.updateClauseList = updateClauseList;
		this.fullQueries = this.#generateUpdateQueries();
	}
	#generateUpdateQueries() {
		if (!this.updateClauseList || this.updateClauseList.length === 0) {
			return `-- No updates to generate for ${this.relation}\n`;
		}
		return this.updateClauseList.map(item => {
			const updates = [];
			for (const key in item) {
				if (key !== 'nanoid' && key !== 'channel_nanoid') {
					let value = item[key];
					if (value === null) {
						updates.push(`${key} = NULL`);
					} else if (typeof value === 'boolean' || typeof value === 'number') {
						updates.push(`${key} = ${value}`);
					} else {
						updates.push(`${key} = '${value.toString().replace(/'/g, "''")}'`);
					}
				}
			}
			const primaryKeyName = this.relation === 'channel_T' ? 'channel_nanoid' : 'nanoid';
			return `UPDATE ${this.relation} SET ${updates.join(', ')} WHERE ${primaryKeyName} = '${item.channel_nanoid || item.nanoid}';`;
		}).join('\n');
	}
	exportSQL() {
		return this.fullQueries;
	}
}

// ... (Todas as outras classes permanecem iguais)
class resolution_A extends SQLGenerator { constructor() { const valueList = [[0, false, 144, 'video'], [1, false, 240, 'video'], [2, false, 360, 'video'], [3, false, 480, 'video'], [4, false, 720, 'video'], [5, false, 1080, 'video'], [6, true, 256, 'video'], [7, true, 426, 'video'], [8, true, 640, 'video'], [9, true, 854, 'video'], [10, true, 1280, 'video'], [11, true, 1920, 'video'], [12, false, 144, 'short'], [13, false, 240, 'short'], [14, false, 360, 'short'], [15, false, 480, 'short'], [16, false, 720, 'short'], [17, false, 1080, 'short'], [18, true, 256, 'short'], [19, true, 426, 'short'], [20, true, 640, 'short'], [21, true, 854, 'short'], [22, true, 1280, 'short'], [23, true, 1920, 'short'], [24, false, 144, 'live'], [25, false, 240, 'live'], [26, false, 360, 'live'], [27, false, 480, 'live'], [28, false, 720, 'live'], [29, false, 1080, 'live'], [30, true, 256, 'live'], [31, true, 426, 'live'], [32, true, 640, 'live'], [33, true, 854, 'live'], [34, true, 1280, 'live'], [35, true, 1920, 'live']]; super('resolution_A', ['uid', '_is_vertical', '_height', '_type'], valueList, 'uid'); this.valueList = valueList; } }
class member_level_A extends SQLGenerator { constructor() { const valueList = [[0, 'Não membro'], [1, 'Gasolina'], [2, 'Podium'], [3, 'Etanol'], [4, 'Nitrometano'], [5, 'Hidrazina']]; super('member_level_A', ['tier', '_label'], valueList, 'tier'); this.valueList = valueList; } }
class language_A extends SQLGenerator { constructor() { const valueList = [[1, 'English'], [2, 'Portuguese'], [3, 'Japanese'], [4, 'Spanish'], [5, 'French'], [6, 'German'], [7, 'Chinese'], [8, 'Russian'], [9, 'Korean'], [10, 'Italian'], [11, 'Dutch'], [12, 'Arabic'], [13, 'Hindi'], [14, 'Turkish'], [15, 'Swedish'], [16, 'Norwegian'], [17, 'Danish'], [18, 'Finnish'], [19, 'Polish'], [20, 'Greek'], [21, 'Hebrew'], [22, 'Thai'], [23, 'Vietnamese'], [24, 'Indonesian'], [25, 'Malay'], [26, 'Czech'], [27, 'Hungarian'], [28, 'Romanian'], [29, 'Ukrainian']]; super('language_A', ['uid', '_label'], valueList, 'uid'); this.valueList = valueList; } }
class indicative_rating_A extends SQLGenerator { constructor() { const valueList = [[1, 'L'], [2, '10'], [3, '12'], [4, '14'], [5, '16'], [6, '18']]; super('indicative_rating_A', ['uid', '_label'], valueList, 'uid'); this.valueList = valueList; } }
class category_A extends SQLGenerator { constructor() { const valueList = [[1, 'Pessoas e Blogs'], [2, 'Música'], [3, 'Filmes e Animação'], [4, 'Automóveis e Veículos'], [5, 'Animais de Estimação e Bichos'], [6, 'Esportes'], [7, 'Viagens e Eventos'], [8, 'Games'], [9, 'Comédia'], [10, 'Entretenimento'], [11, 'Notícias e Política'], [12, 'Guias e Estilo'], [13, 'Educação'], [14, 'Ciência e Tecnologia'], [15, 'Sem Fins Lucrativos e Ativismo']]; super('category_A', ['uid', '_label'], valueList, 'uid'); this.valueList = valueList; } }
class status_A extends SQLGenerator { constructor() { const valueList = [[1, 'Agendado'], [2, 'Privado'], [3, 'Não Listado'], [4, 'Público']]; super('status_A', ['uid', '_label'], valueList, 'uid'); this.valueList = valueList; } }
class interaction_A extends SQLGenerator { constructor() { const valueList = [[1, 'Denúncia'], [2, 'Dislike'], [3, 'Like'], [4, 'Salvamento'], [5, 'Compartilhamento']]; super('interaction_A', ['uid', '_label'], valueList, 'uid'); this.valueList = valueList; } }
class login_provider_A extends SQLGenerator { constructor() { const valueList = [[0, 'compilerhub.com'], [1, 'google.com']]; super('login_provider_A', ['uid', '_name'], valueList, 'uid'); this.valueList = valueList; } }
class user_T extends SQLGenerator { constructor(numUsers, mailPosfix, profilePicturePrefix, loginProviderInstance) { const loginProviderUids = loginProviderInstance.valueList.map(p => p[0]); const valueList = user_T.#generateLists(numUsers, mailPosfix, profilePicturePrefix, loginProviderUids); super('user_T', ['nanoid', 'firebaseid', '_name', '_email', '_is_verified', '_profile_picture_url', '_created_at', 'sign_in_provider_uid'], valueList, 'nanoid'); this.numUsers = numUsers; this.valueList = valueList; } static #generateLists(numUsers, mailPosfix, profilePicturePrefix, loginProviderUids) { const list = []; for (let i = 0; i < numUsers; i++) { const nano = nanoid(); const firebase = nanoid(128); const name = `user${i}`; const email = `${name}${mailPosfix}`; const is_verified = Math.random() > 0.3; const pfp_url = `${profilePicturePrefix}${name}`; const created_at = Rand.randomTimestamp(); const provider_uid = Rand.sampleWithoutRepeat(loginProviderUids, 1)[0]; list.push([nano, firebase, name, email, is_verified, pfp_url, created_at, provider_uid]); } return list; } }
class channel_T extends SQLGenerator { constructor(numChannels, bannerPrefix, userInstance) { const valueList = channel_T.#generateLists(numChannels, bannerPrefix, userInstance); super('channel_T', ['nanoid', '_url', '_created_at', '_name', '_description', '_banner_url', 'user_nanoid'], valueList, 'nanoid'); this.numChannels = numChannels; this.valueList = valueList; } static #generateLists(numChannels, bannerPrefix, userInstance) { numChannels = Math.min(numChannels, userInstance.valueList.length); const userNanoids = userInstance.valueList.map(user => user[0]); const sampledNanoids = Rand.sampleWithoutRepeat(userNanoids, numChannels); const list = []; for (let i = 0; i < sampledNanoids.length; i++) { const nano = nanoid(); const _name = `channel${i}`; const _url = `compilerhub.com.br/${_name}`; const _created_at = Rand.randomTimestamp(); const _description = `Welcome to the channel of ${_name}! We talk about many interesting things here.`; const _banner_url = `${bannerPrefix}${_name}`; const user_nanoid = sampledNanoids[i]; list.push([nano, _url, _created_at, _name, _description, _banner_url, user_nanoid]); } return list; } }
class channel_external_link_T extends SQLGenerator { constructor(linkPrefixes, channelInstance) { const valueList = channel_external_link_T.#generateLists(linkPrefixes, channelInstance); super('channel_external_link_T', ['nanoid', 'channel_nanoid', '_url'], valueList, 'nanoid'); this.valueList = valueList; } static #generateLists(linkPrefixes, channelInstance) { const results = []; for (let i = 0; i < channelInstance.numChannels; i++) { const numLinks = Rand.randomInt(0, linkPrefixes.length + 1); const sampledPrefixes = Rand.sampleWithoutRepeat(linkPrefixes, numLinks); for (let j = 0; j < sampledPrefixes.length; j++) { const nano = nanoid(); const channel_nanoid = channelInstance.valueList[i][0]; const channel_name = channelInstance.valueList[i][3]; const _url = `${sampledPrefixes[j]}${channel_name}`; results.push([nano, channel_nanoid, _url]); } } return results; } }
class user_admin_channel_T extends SQLGenerator { constructor(userInstance, channelInstance, maxAdms = 1) { const valueList = user_admin_channel_T.#generateLists(userInstance, channelInstance, maxAdms); super('user_admin_channel_T', ['user_nanoid', 'channel_nanoid'], valueList, 'user_nanoid, channel_nanoid'); this.valueList = valueList; } static #generateLists(userInstance, channelInstance, maxAdms) { if (maxAdms < 1) { throw new Error("cada canal tem pelo menos um ADM (o criador)"); } const results = []; for (let i = 0; i < channelInstance.valueList.length; i++) { const channelData = channelInstance.valueList[i]; const channelNanoid = channelData[0]; const creatorNanoid = channelData[6]; results.push([creatorNanoid, channelNanoid]); const numExtraADMS = Rand.randomInt(0, maxAdms); const allNanoids = userInstance.valueList.map(user => user[0]).filter(id => id !== creatorNanoid); let sampledNanoids = Rand.smallSampleWithoutRepeat(allNanoids, numExtraADMS); for (let j = 0; j < sampledNanoids.length; j++) { results.push([sampledNanoids[j], channelNanoid]); } } return results; } }
class user_interest_channel_T extends SQLGenerator { constructor(userInstance, channelInstance, memberLevelTiers) { const valueList = user_interest_channel_T.#generateLists(userInstance, channelInstance, memberLevelTiers); super('user_interest_channel_T', ['user_nanoid', 'channel_nanoid', '_is_sub', '_is_notified', 'member_level_tier'], valueList, 'user_nanoid, channel_nanoid'); this.valueList = valueList; } static #generateLists(userInstance, channelInstance, memberLevelTiers) { const results = []; const userNanoids = userInstance.valueList.map(user => user[0]); const channelNanoids = channelInstance.valueList.map(channel => channel[0]); const nonMemberTiers = memberLevelTiers.filter(tier => tier !== 0); for (const currentUserNanoid of userNanoids) { const numInteractions = Rand.randomInt(0, Math.floor(channelNanoids.length * 0.25)); const sampledChannels = Rand.smallSampleWithoutRepeat(channelNanoids, numInteractions); for (const currentChannelNanoid of sampledChannels) { const _is_sub = Math.random() > 0.5; const _is_notified = _is_sub ? Math.random() > 0.3 : false; const member_level_tier = _is_sub ? Rand.sampleWithoutRepeat(nonMemberTiers, 1)[0] : 0; results.push([currentUserNanoid, currentChannelNanoid, _is_sub, _is_notified, member_level_tier]); } } return results; } }
class content_T extends SQLGenerator { constructor(numContent, channelInstance, statusUids, resolutionUids, categoryUids, indicativeRatingUids, languageUids, contentPrefix, thumbnailPrefix, contentType = 'video') { const valueList = content_T.#generateLists(numContent, channelInstance, statusUids, resolutionUids, categoryUids, indicativeRatingUids, languageUids, contentPrefix, thumbnailPrefix, contentType); const keyList = ['nanoid', '_url', '_title', '_created_at', '_thumbnail_url', '_description', '_duration', 'status_uid', 'resolution_uid', 'category_uid', 'indicative_rating_uid', 'language_uid', 'channel_nanoid']; super('content_T', keyList, valueList, 'nanoid'); this.numContent = numContent; this.valueList = valueList; } static #generateLists(numContent, channelInstance, statusUids, resolutionUids, categoryUids, indicativeRatingUids, languageUids, contentPrefix, thumbnailPrefix, contentType) { const list = []; const channelNanoids = channelInstance.valueList.map(channel => channel[0]); if (channelNanoids.length === 0) return []; const applicableResolutionUids = resolutionUids.filter(res => res[3] === contentType).map(res => res[0]); if (applicableResolutionUids.length === 0) return []; for (let i = 0; i < numContent; i++) { const nano = nanoid(); const _title = `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} Title ${i}`; const _url = `${contentPrefix}${contentType}-${nano}`; const _created_at = Rand.randomTimestamp(); const _thumbnail_url = `${thumbnailPrefix}thumb-${contentType}-${i}.jpg`; const _description = `Detailed description for ${contentType} item number ${i}.`; let _duration; if (contentType === 'short') { _duration = `00:00:${Rand.randomInt(5, 60).toString().padStart(2, '0')}`; } else if (contentType === 'live') { _duration = `0${Rand.randomInt(1, 4)}:${Rand.randomInt(0, 60).toString().padStart(2, '0')}:${Rand.randomInt(0, 60).toString().padStart(2, '0')}`; } else { _duration = `00:${Rand.randomInt(1, 45).toString().padStart(2, '0')}:${Rand.randomInt(0, 60).toString().padStart(2, '0')}`; } const status_uid = Rand.sampleWithoutRepeat(statusUids, 1)[0]; const resolution_uid = Rand.sampleWithoutRepeat(applicableResolutionUids, 1)[0]; const category_uid = Rand.sampleWithoutRepeat(categoryUids, 1)[0]; const indicative_rating_uid = Rand.sampleWithoutRepeat(indicativeRatingUids, 1)[0]; const language_uid = Rand.sampleWithoutRepeat(languageUids, 1)[0]; const channel_nanoid = channelNanoids[Rand.randomInt(0, channelNanoids.length)]; list.push([nano, _url, _title, _created_at, _thumbnail_url, _description, _duration, status_uid, resolution_uid, category_uid, indicative_rating_uid, language_uid, channel_nanoid]); } return list; } }
class caption_T extends SQLGenerator { constructor(contentInstance, languageUids) { const valueList = caption_T.#generateLists(contentInstance, languageUids); super('caption_T', ['language_uid', 'content_nanoid', '_body'], valueList, 'language_uid, content_nanoid'); this.valueList = valueList; } static #generateLists(contentInstance, languageUids) { const results = []; const allContent = contentInstance.valueList; if (allContent.length === 0) return []; for (const content of allContent) { const currentContentNanoid = content[0]; const numLanguagesForContent = Rand.randomInt(1, 4); const sampledLanguageUids = Rand.smallSampleWithoutRepeat(languageUids, numLanguagesForContent); for (const langUid of sampledLanguageUids) { const _body = `Caption for content ${currentContentNanoid} in language UID ${langUid}.`; results.push([langUid, currentContentNanoid, _body]); } } return results; } }
class user_watch_content_T extends SQLGenerator { constructor(numWatchRecords, userInstance, contentInstance) { const valueList = user_watch_content_T.#generateLists(numWatchRecords, userInstance, contentInstance); super('user_watch_content_T', ['nanoid', '_duration', '_created_at', '_is_currently_watching', 'user_nanoid', 'content_nanoid'], valueList, 'nanoid'); this.valueList = valueList; } static #generateLists(numWatchRecords, userInstance, contentInstance) { const results = []; const userNanoids = userInstance.valueList.map(user => user[0]); const contentNanoids = contentInstance.valueList.map(content => content[0]); if (userNanoids.length === 0 || contentNanoids.length === 0) return []; for (let i = 0; i < numWatchRecords; i++) { const nano = nanoid(); const _duration = `00:${Rand.randomInt(0, 10).toString().padStart(2, '0')}:${Rand.randomInt(0, 60).toString().padStart(2, '0')}`; const _created_at = Rand.randomTimestamp(); const _is_currently_watching = Math.random() < 0.05; const user_nanoid = userNanoids[Rand.randomInt(0, userNanoids.length)]; const content_nanoid = contentNanoids[Rand.randomInt(0, contentNanoids.length)]; results.push([nano, _duration, _created_at, _is_currently_watching, user_nanoid, content_nanoid]); } return results; } }
class video_T extends SQLGenerator { constructor(contentNanoidsForVideos) { const valueList = video_T.#generateLists(contentNanoidsForVideos); super('video_T', ['content_nanoid'], valueList, 'content_nanoid'); this.valueList = valueList; } static #generateLists(contentNanoidsForVideos) { return contentNanoidsForVideos.map(nanoid => [nanoid]); } }
class live_T extends SQLGenerator { constructor(contentNanoidsForLive) { const valueList = live_T.#generateLists(contentNanoidsForLive); super('live_T', ['content_nanoid', '_is_live_now', '_start_time'], valueList, 'content_nanoid'); this.valueList = valueList; } static #generateLists(contentNanoidsForLive) { const results = []; for (const content_nanoid of contentNanoidsForLive) { const _is_live_now = Math.random() < 0.1; const _start_time = Rand.randomTimestamp(); results.push([content_nanoid, _is_live_now, _start_time]); } return results; } }
class short_T extends SQLGenerator { constructor(contentNanoidsForShorts, videoInstance) { const valueList = short_T.#generateLists(contentNanoidsForShorts, videoInstance); super('short_T', ['content_nanoid', 'cut_of_video_nanoid', '_music_url'], valueList, 'content_nanoid'); this.valueList = valueList; } static #generateLists(contentNanoidsForShorts, videoInstance) { const results = []; const videoContentNanoids = videoInstance.valueList.map(video => video[0]); for (const content_nanoid of contentNanoidsForShorts) { let cut_of_video_nanoid = null; if (videoContentNanoids.length > 0 && Math.random() < 0.5) { cut_of_video_nanoid = videoContentNanoids[Rand.randomInt(0, videoContentNanoids.length)]; } const _music_url = Math.random() < 0.7 ? `https://example.com/music/${nanoid()}.mp3` : null; results.push([content_nanoid, cut_of_video_nanoid, _music_url]); } return results; } }
class channel_F extends UpdateGenerator { constructor(channelInstance, videoInstance, updateRate = 0.2) { const updateClauseList = channel_F.#generateUpdateClauses(channelInstance, videoInstance, updateRate); super('channel_T', updateClauseList); this.updateClauseList = updateClauseList; } static #generateUpdateClauses(channelInstance, videoInstance, updateRate) { const results = []; const allChannelNanoids = channelInstance.valueList.map(channel => channel[0]); const videoContentNanoids = videoInstance.valueList.map(video => video[0]); if (allChannelNanoids.length === 0 || videoContentNanoids.length === 0) { console.warn("Not enough channel or video data to generate welcome video updates."); return []; } const numChannelsToUpdate = Math.floor(allChannelNanoids.length * updateRate); const sampledChannelNanoids = Rand.sampleWithoutRepeat(allChannelNanoids, numChannelsToUpdate); for (const channel_nanoid of sampledChannelNanoids) { const welcome_video_nanoid = videoContentNanoids[Rand.randomInt(0, videoContentNanoids.length)]; results.push({ channel_nanoid, welcome_video_nanoid }); } return results; } }
class poll_T extends SQLGenerator { constructor(numPolls, channelInstance) { const valueList = poll_T.#generateLists(numPolls, channelInstance); super('poll_T', ['nanoid', '_title', '_created_at', 'channel_nanoid'], valueList, 'nanoid'); this.valueList = valueList; } static #generateLists(numPolls, channelInstance) { const results = []; const channelNanoids = channelInstance.valueList.map(channel => channel[0]); if (channelNanoids.length === 0) return []; for (let i = 0; i < numPolls; i++) { const nano = nanoid(); const _title = `Poll Title ${i}: What is your favorite?`; const _created_at = Rand.randomTimestamp(); const channel_nanoid = channelNanoids[Rand.randomInt(0, channelNanoids.length)]; results.push([nano, _title, _created_at, channel_nanoid]); } return results; } }
class poll_option_T extends SQLGenerator { constructor(pollInstance, minOptions = 2, maxOptions = 5) { const valueList = poll_option_T.#generateLists(pollInstance, minOptions, maxOptions); super('poll_option_T', ['nanoid', 'poll_nanoid', '_body'], valueList, 'nanoid'); this.valueList = valueList; } static #generateLists(pollInstance, minOptions, maxOptions) { const results = []; const pollNanoids = pollInstance.valueList.map(poll => poll[0]); if (pollNanoids.length === 0) return []; const optionTemplates = ["Option A", "Option B", "Option C", "Option D", "E", "Yes", "No", "Maybe"]; for (const currentPollNanoid of pollNanoids) { const numOptions = Rand.randomInt(minOptions, maxOptions + 1); const sampledOptionTemplates = Rand.smallSampleWithoutRepeat(optionTemplates, numOptions); for (const optionBody of sampledOptionTemplates) { results.push([nanoid(), currentPollNanoid, optionBody]); } } return results; } }
class poll_response_T extends SQLGenerator { constructor(numResponses, userInstance, pollInstance, pollOptionInstance) { const valueList = poll_response_T.#generateLists(numResponses, userInstance, pollInstance, pollOptionInstance); super('poll_response_T', ['user_nanoid', 'option_nanoid', '_created_at'], valueList, 'user_nanoid, option_nanoid'); this.valueList = valueList; } static #generateLists(numResponses, userInstance, pollInstance, pollOptionInstance) { const results = []; const userNanoids = userInstance.valueList.map(user => user[0]); const pollOptionsMap = new Map(); pollOptionInstance.valueList.forEach(opt => { const [optionNano, pollNano] = opt; if (!pollOptionsMap.has(pollNano)) pollOptionsMap.set(pollNano, []); pollOptionsMap.get(pollNano).push(optionNano); }); const allPollNanoids = [...pollOptionsMap.keys()]; if (userNanoids.length === 0 || allPollNanoids.length === 0) return []; const votedUserPolls = new Set(); for (let i = 0; i < numResponses; i++) { const user_nanoid = userNanoids[Rand.randomInt(0, userNanoids.length)]; const poll_nanoid = allPollNanoids[Rand.randomInt(0, allPollNanoids.length)]; const voteKey = `${user_nanoid}|${poll_nanoid}`; if (!votedUserPolls.has(voteKey)) { const optionsForThisPoll = pollOptionsMap.get(poll_nanoid); if (optionsForThisPoll && optionsForThisPoll.length > 0) { const option_nanoid = optionsForThisPoll[Rand.randomInt(0, optionsForThisPoll.length)]; const _created_at = Rand.randomTimestamp(); results.push([user_nanoid, option_nanoid, _created_at]); votedUserPolls.add(voteKey); } } } return results; } }
class comment_T extends SQLGenerator { constructor(numComments, userInstance) { const valueList = comment_T.#generateLists(numComments, userInstance); super('comment_T', ['nanoid', '_created_at', '_is_edited', '_body', 'user_nanoid'], valueList, 'nanoid'); this.valueList = valueList; } static #generateLists(numComments, userInstance) { const results = []; const userNanoids = userInstance.valueList.map(user => user[0]); if (userNanoids.length === 0) return []; for (let i = 0; i < numComments; i++) { const nano = nanoid(); const _created_at = Rand.randomTimestamp(); const _is_edited = Math.random() < 0.15; const _body = `This is comment number ${i}. Great content!`; const user_nanoid = userNanoids[Rand.randomInt(0, userNanoids.length)]; results.push([nano, _created_at, _is_edited, _body, user_nanoid]); } return results; } }
class video_comment_T extends SQLGenerator { constructor(commentNanoidsForVideos, videoInstance) { const valueList = video_comment_T.#generateLists(commentNanoidsForVideos, videoInstance); super('video_comment_T', ['comment_nanoid', 'content_nanoid'], valueList, 'comment_nanoid'); this.valueList = valueList; } static #generateLists(commentNanoids, videoInstance) { const results = []; const videoNanoids = videoInstance.valueList.map(v => v[0]); if (videoNanoids.length === 0 || commentNanoids.length === 0) return []; for (const comment_nanoid of commentNanoids) { const content_nanoid = videoNanoids[Rand.randomInt(0, videoNanoids.length)]; results.push([comment_nanoid, content_nanoid]); } return results; } }
class live_comment_T extends SQLGenerator { constructor(commentNanoidsForLive, liveInstance) { const valueList = live_comment_T.#generateLists(commentNanoidsForLive, liveInstance); super('live_comment_T', ['comment_nanoid', 'content_nanoid'], valueList, 'comment_nanoid'); this.valueList = valueList; } static #generateLists(commentNanoids, liveInstance) { const results = []; const liveNanoids = liveInstance.valueList.map(l => l[0]); if (liveNanoids.length === 0 || commentNanoids.length === 0) return []; for (const comment_nanoid of commentNanoids) { const content_nanoid = liveNanoids[Rand.randomInt(0, liveNanoids.length)]; results.push([comment_nanoid, content_nanoid]); } return results; } }
class short_comment_T extends SQLGenerator { constructor(commentNanoidsForShorts, shortInstance) { const valueList = short_comment_T.#generateLists(commentNanoidsForShorts, shortInstance); super('short_comment_T', ['comment_nanoid', 'content_nanoid'], valueList, 'comment_nanoid'); this.valueList = valueList; } static #generateLists(commentNanoids, shortInstance) { const results = []; const shortNanoids = shortInstance.valueList.map(s => s[0]); if (shortNanoids.length === 0 || commentNanoids.length === 0) return []; for (const comment_nanoid of commentNanoids) { const content_nanoid = shortNanoids[Rand.randomInt(0, shortNanoids.length)]; results.push([comment_nanoid, content_nanoid]); } return results; } }
class comment_reply_T extends SQLGenerator { constructor(numReplies, commentInstance) { const valueList = comment_reply_T.#generateLists(numReplies, commentInstance); super('comment_reply_T', ['reply_comment_nanoid', 'target_comment_nanoid'], valueList, 'reply_comment_nanoid, target_comment_nanoid'); this.valueList = valueList; } static #generateLists(numReplies, commentInstance) { const results = []; const allCommentNanoids = commentInstance.valueList.map(c => c[0]); if (allCommentNanoids.length < 2) return []; const addedReplies = new Set(); for (let i = 0; i < numReplies; i++) { let [reply_comment_nanoid, target_comment_nanoid] = Rand.sampleWithoutRepeat(allCommentNanoids, 2); const replyKey = `${reply_comment_nanoid}|${target_comment_nanoid}`; if (!addedReplies.has(replyKey)) { results.push([reply_comment_nanoid, target_comment_nanoid]); addedReplies.add(replyKey); } } return results; } }
class poll_comment_T extends SQLGenerator { constructor(commentNanoidsForPolls, pollInstance) { const valueList = poll_comment_T.#generateLists(commentNanoidsForPolls, pollInstance); super('poll_comment_T', ['comment_nanoid', 'poll_nanoid'], valueList, 'comment_nanoid'); this.valueList = valueList; } static #generateLists(commentNanoids, pollInstance) { const results = []; const pollNanoids = pollInstance.valueList.map(p => p[0]); if (pollNanoids.length === 0 || commentNanoids.length === 0) return []; for (const comment_nanoid of commentNanoids) { const poll_nanoid = pollNanoids[Rand.randomInt(0, pollNanoids.length)]; results.push([comment_nanoid, poll_nanoid]); } return results; } }
class playlist_T extends SQLGenerator { constructor(numPlaylists, channelInstance, statusUids, playlistPrefix, thumbnailPrefix) { const valueList = playlist_T.#generateLists(numPlaylists, channelInstance, statusUids, playlistPrefix, thumbnailPrefix); super('playlist_T', ['nanoid', '_url', '_title', '_description', '_thumbnail_url', 'status_uid', 'channel_nanoid'], valueList, 'nanoid'); this.valueList = valueList; } static #generateLists(numPlaylists, channelInstance, statusUids, playlistPrefix, thumbnailPrefix) { const results = []; const channelNanoids = channelInstance.valueList.map(c => c[0]); if (channelNanoids.length === 0 || statusUids.length === 0) return []; for (let i = 0; i < numPlaylists; i++) { const nano = nanoid(); const _title = `Awesome Playlist ${i}`; const _url = `${playlistPrefix}playlist-${nano}`; const _description = `A curated playlist number ${i}.`; const _thumbnail_url = `${thumbnailPrefix}playlist-thumb-${i}.jpg`; const status_uid = Rand.sampleWithoutRepeat(statusUids, 1)[0]; const channel_nanoid = channelNanoids[Rand.randomInt(0, channelNanoids.length)]; results.push([nano, _url, _title, _description, _thumbnail_url, status_uid, channel_nanoid]); } return results; } }
class playlist_content_T extends SQLGenerator { constructor(numPlaylistContentEntries, playlistInstance, contentInstance) { const valueList = playlist_content_T.#generateLists(numPlaylistContentEntries, playlistInstance, contentInstance); super('playlist_content_T', ['playlist_nanoid', 'content_nanoid', '_inserted_at', '_play_content_order'], valueList, 'playlist_nanoid, content_nanoid'); this.valueList = valueList; } static #generateLists(numEntries, playlistInstance, contentInstance) { const results = []; const playlistNanoids = playlistInstance.valueList.map(p => p[0]); const contentNanoids = contentInstance.valueList.map(c => c[0]); if (playlistNanoids.length === 0 || contentNanoids.length === 0) return []; const addedEntries = new Set(); let orderMap = new Map(); for (let i = 0; i < numEntries; i++) { const playlist_nanoid = playlistNanoids[Rand.randomInt(0, playlistNanoids.length)]; const content_nanoid = contentNanoids[Rand.randomInt(0, contentNanoids.length)]; const key = `${playlist_nanoid}|${content_nanoid}`; if (!addedEntries.has(key)) { const _inserted_at = Rand.randomTimestamp(); const currentOrder = (orderMap.get(playlist_nanoid) || 0) + 1; orderMap.set(playlist_nanoid, currentOrder); results.push([playlist_nanoid, content_nanoid, _inserted_at, currentOrder]); addedEntries.add(key); } } return results; } }
class notification_T extends SQLGenerator { constructor(numNotifications, channelInstance) { const valueList = notification_T.#generateLists(numNotifications, channelInstance); super('notification_T', ['nanoid', '_body', 'channel_nanoid'], valueList, 'nanoid'); this.valueList = valueList; } static #generateLists(numNotifications, channelInstance) { const results = []; const channelNanoids = channelInstance.valueList.map(c => c[0]); if (channelNanoids.length === 0) return []; for (let i = 0; i < numNotifications; i++) { const nano = nanoid(); const _body = `Channel update: New video available! Notification number ${i}.`; const channel_nanoid = channelNanoids[Rand.randomInt(0, channelNanoids.length)]; results.push([nano, _body, channel_nanoid]); } return results; } }
class user_notified_T extends SQLGenerator { constructor(numUserNotifications, userInstance, notificationInstance) { const valueList = user_notified_T.#generateLists(numUserNotifications, userInstance, notificationInstance); super('user_notified_T', ['user_nanoid', 'notification_nanoid', '_sent_at', '_was_read'], valueList, 'user_nanoid, notification_nanoid'); this.valueList = valueList; } static #generateLists(numUserNotifications, userInstance, notificationInstance) { const results = []; const userNanoids = userInstance.valueList.map(u => u[0]); const notificationNanoids = notificationInstance.valueList.map(n => n[0]); if (userNanoids.length === 0 || notificationNanoids.length === 0) return []; const notificationRecords = new Set(); for (let i = 0; i < numUserNotifications; i++) { const user_nanoid = userNanoids[Rand.randomInt(0, userNanoids.length)]; const notification_nanoid = notificationNanoids[Rand.randomInt(0, notificationNanoids.length)]; const recordKey = `${user_nanoid}|${notification_nanoid}`; if (!notificationRecords.has(recordKey)) { const _sent_at = Rand.randomTimestamp(); const _was_read = Math.random() < 0.7; results.push([user_nanoid, notification_nanoid, _sent_at, _was_read]); notificationRecords.add(recordKey); } } return results; } }
class playlist_tag_T extends SQLGenerator { constructor(numPlaylistTags, playlistInstance, tagInstance) { const valueList = playlist_tag_T.#generateLists(numPlaylistTags, playlistInstance, tagInstance); super('playlist_tag_T', ['playlist_nanoid', 'tag_nanoid'], valueList, 'playlist_nanoid, tag_nanoid'); this.valueList = valueList; } static #generateLists(numPlaylistTags, playlistInstance, tagInstance) { const results = []; const playlistNanoids = playlistInstance.valueList.map(p => p[0]); const tagNanoids = tagInstance.valueList.map(t => t[0]); if (playlistNanoids.length === 0 || tagNanoids.length === 0) return []; const addedTags = new Set(); for (let i = 0; i < numPlaylistTags; i++) { const playlist_nanoid = playlistNanoids[Rand.randomInt(0, playlistNanoids.length)]; const tag_nanoid = tagNanoids[Rand.randomInt(0, tagNanoids.length)]; const key = `${playlist_nanoid}|${tag_nanoid}`; if (!addedTags.has(key)) { results.push([playlist_nanoid, tag_nanoid]); addedTags.add(key); } } return results; } }
class content_tag_T extends SQLGenerator { constructor(numContentTags, contentInstance, tagInstance) { const valueList = content_tag_T.#generateLists(numContentTags, contentInstance, tagInstance); super('content_tag_T', ['content_nanoid', 'tag_nanoid'], valueList, 'content_nanoid, tag_nanoid'); this.valueList = valueList; } static #generateLists(numContentTags, contentInstance, tagInstance) { const results = []; const contentNanoids = contentInstance.valueList.map(c => c[0]); const tagNanoids = tagInstance.valueList.map(t => t[0]); if (contentNanoids.length === 0 || tagNanoids.length === 0) return []; const addedTags = new Set(); for (let i = 0; i < numContentTags; i++) { const content_nanoid = contentNanoids[Rand.randomInt(0, contentNanoids.length)]; const tag_nanoid = tagNanoids[Rand.randomInt(0, tagNanoids.length)]; const key = `${content_nanoid}|${tag_nanoid}`; if (!addedTags.has(key)) { results.push([content_nanoid, tag_nanoid]); addedTags.add(key); } } return results; } }

// === [FIXED] ===
class tag_T extends SQLGenerator {
	constructor(numTags) {
		const valueList = tag_T.#generateLists(numTags);
		// FIX: Conflict target is the `_label` column, which is UNIQUE.
		super('tag_T', ['nanoid', '_label'], valueList, '_label');
		this.valueList = valueList;
	}
	static #generateLists(numTags) {
		const results = [];
		const generatedLabels = new Set();
		const baseLabels = ["#programming", "#coding", "#javascript", "#python", "#webdev", "#gaming", "#fortnite", "#minecraft", "#stream", "#esports", "#music", "#pop", "#rock", "#hiphop", "#indie", "#tutorial", "#howto", "#diy", "#education", "#learn", "#vlog", "#daily", "#travel", "#food", "#review"];

		// FIX: Robustly generate unique labels
		baseLabels.forEach(label => {
			if (generatedLabels.size < numTags) {
				generatedLabels.add(label);
			}
		});

		while (generatedLabels.size < numTags) {
			generatedLabels.add(`#tag_${nanoid(8)}`);
		}

		generatedLabels.forEach(label => {
			results.push([nanoid(), label]);
		});

		return results;
	}
}

// === [FIXED] ===
class user_interaction_content_T extends SQLGenerator {
	constructor(interactionTuples) {
		// The conflict key should match the DDL's PK. If you want to allow multiple interaction types,
		// the DDL primary key must be (user_nanoid, content_nanoid, interaction_uid).
		super('user_interaction_content_T', ['user_nanoid', 'content_nanoid', 'interaction_uid'], interactionTuples, 'user_nanoid, content_nanoid, interaction_uid');
		this.valueList = interactionTuples;
	}
}

// === [FIXED] ===
class user_interaction_playlist_T extends SQLGenerator {
	constructor(interactionTuples) {
		// FIX: Conflict key now matches the DDL's PRIMARY KEY
		super('user_interaction_playlist_T', ['user_nanoid', 'playlist_nanoid', 'interaction_uid'], interactionTuples, 'user_nanoid, playlist_nanoid');
		this.valueList = interactionTuples;
	}
}

// === [FIXED] ===
class user_interaction_comment_T extends SQLGenerator {
	constructor(interactionTuples) {
		// FIX: Conflict key now matches the DDL's PRIMARY KEY
		super('user_interaction_comment_T', ['user_nanoid', 'comment_nanoid', 'interaction_uid'], interactionTuples, 'user_nanoid, comment_nanoid');
		this.valueList = interactionTuples;
	}
}


// ===================================
// === MAIN DATA GENERATION SCRIPT ===
// ===================================
const mailPosfix = '@gmail.com';
const profilePicturePrefix = 'https://i.pravatar.cc/150?u=';
const bannerPrefix = 'https://example.com/banners/';
const linkPrefixes = ['https://facebook.com/', 'https://twitter.com/', 'https://instagram.com/'];
const playlistPrefix = 'https://compilerhub.com.br/playlists/';
const playlistThumbnailPrefix = 'https://compilerhub.com.br/playlist_thumbnails/';
const contentPrefix = 'https://compilerhub.com.br/content/';
const thumbnailPrefix = 'https://compilerhub.com.br/thumbnails/';

const numUsers = 1000;
const numChannels = 300;
const numContents = 5000;
const numPlaylists = 1000;
const numPolls = 500;
const numComments = 10000;
const numNotifications = 2000;
const numTags = 500;
const numWatchRecords = 20000;
const numCommentReplies = 4000;
const numPlaylistContentEntries = 10000;
const numPlaylistTags = 2000;
const numContentTags = 10000;
const totalNumInteractions = 20000;
const numUserNotifications = 10000;
const numPollResponses = 10000;

console.log('Starting data generation...');

// --- 1. Auxiliary and Parameter Tables (No Dependencies) ---
const resolutionAInstance = new resolution_A();
const memberLevelAInstance = new member_level_A();
const languageAInstance = new language_A();
const indicativeRatingAInstance = new indicative_rating_A();
const categoryAInstance = new category_A();
const statusAInstance = new status_A();
const interactionAInstance = new interaction_A();
const loginProviderInstance = new login_provider_A();
const tagInstance = new tag_T(numTags);

const memberLevelTiers = memberLevelAInstance.valueList.map(item => item[0]);
const allLanguageUids = languageAInstance.valueList.map(item => item[0]);
const allIndicativeRatingUids = indicativeRatingAInstance.valueList.map(item => item[0]);
const allCategoryUids = categoryAInstance.valueList.map(item => item[0]);
const allStatusUids = statusAInstance.valueList.map(item => item[0]);
const allInteractionUids = interactionAInstance.valueList.map(item => item[0]);
const allResolutionAData = resolutionAInstance.valueList;

// --- 2. Core Entities ---
const userInstance = new user_T(numUsers, mailPosfix, profilePicturePrefix, loginProviderInstance);
const channelInstance = new channel_T(numChannels, bannerPrefix, userInstance);
const notificationInstance = new notification_T(numNotifications, channelInstance);
const pollInstance = new poll_T(numPolls, channelInstance);
const commentInstance = new comment_T(numComments, userInstance);
const playlistInstance = new playlist_T(numPlaylists, channelInstance, allStatusUids, playlistPrefix, playlistThumbnailPrefix);

// --- 3. Content Generation (with Specialization) ---
const numLiveContents = Math.floor(numContents * 0.05);
const numShortContents = Math.floor(numContents * 0.25);
const numVideoContents = numContents - numLiveContents - numShortContents;

const tempVideoContent = new content_T(numVideoContents, channelInstance, allStatusUids, allResolutionAData, allCategoryUids, allIndicativeRatingUids, allLanguageUids, contentPrefix, thumbnailPrefix, 'video');
const tempLiveContent = new content_T(numLiveContents, channelInstance, allStatusUids, allResolutionAData, allCategoryUids, allIndicativeRatingUids, allLanguageUids, contentPrefix, thumbnailPrefix, 'live');
const tempShortContent = new content_T(numShortContents, channelInstance, allStatusUids, allResolutionAData, allCategoryUids, allIndicativeRatingUids, allLanguageUids, contentPrefix, thumbnailPrefix, 'short');

const allContentDataCombined = [...tempVideoContent.valueList, ...tempLiveContent.valueList, ...tempShortContent.valueList];
const contentInstance = { valueList: allContentDataCombined };

const videoInstance = new video_T(tempVideoContent.valueList.map(c => c[0]));
const liveInstance = new live_T(tempLiveContent.valueList.map(c => c[0]));
const shortInstance = new short_T(tempShortContent.valueList.map(c => c[0]), videoInstance);

// --- 4. Relational Tables & Remaining Entities (in dependency order) ---
const channelExternalLinkInstance = new channel_external_link_T(linkPrefixes, channelInstance);
const userAdminChannelInstance = new user_admin_channel_T(userInstance, channelInstance, 3);
const userInterestChannelInstance = new user_interest_channel_T(userInstance, channelInstance, memberLevelTiers);
const captionInstance = new caption_T(contentInstance, allLanguageUids);
const userWatchContentInstance = new user_watch_content_T(numWatchRecords, userInstance, contentInstance);
const pollOptionInstance = new poll_option_T(pollInstance, 2, 5);
const pollResponseInstance = new poll_response_T(numPollResponses, userInstance, pollInstance, pollOptionInstance);

const allCommentNanoids = commentInstance.valueList.map(comment => comment[0]);
const shuffledCommentNanoids = Rand.sampleWithoutRepeat(allCommentNanoids, allCommentNanoids.length);
const numVideoComments = Math.floor(numComments * 0.40);
const numLiveComments = Math.floor(numComments * 0.20);
const numShortComments = Math.floor(numComments * 0.20);
const numPollComments = numComments - numVideoComments - numLiveComments - numShortComments;
const videoCommentInstance = new video_comment_T(shuffledCommentNanoids.slice(0, numVideoComments), videoInstance);
const liveCommentInstance = new live_comment_T(shuffledCommentNanoids.slice(numVideoComments, numVideoComments + numLiveComments), liveInstance);
const shortCommentInstance = new short_comment_T(shuffledCommentNanoids.slice(numVideoComments + numLiveComments, numVideoComments + numLiveComments + numShortComments), shortInstance);
const pollCommentInstance = new poll_comment_T(shuffledCommentNanoids.slice(numVideoComments + numLiveComments + numShortComments), pollInstance);
const commentReplyInstance = new comment_reply_T(numCommentReplies, commentInstance);
const playlistContentInstance = new playlist_content_T(numPlaylistContentEntries, playlistInstance, contentInstance);
const playlistTagInstance = new playlist_tag_T(numPlaylistTags, playlistInstance, tagInstance);
const contentTagInstance = new content_tag_T(numContentTags, contentInstance, tagInstance);
const userNotifiedInstance = new user_notified_T(numUserNotifications, userInstance, notificationInstance);

// --- 5. User Interactions (respecting DDL primary key) ---
const contentInteractionTuples = [], playlistInteractionTuples = [], commentInteractionTuples = [];
const interactedContentPairs = new Set();
const interactedPlaylistPairs = new Set();
const interactedCommentPairs = new Set();

for (let i = 0; i < totalNumInteractions; i++) {
	const user_nanoid = userInstance.valueList[Rand.randomInt(0, userInstance.valueList.length)][0];
	const interaction_uid_val = allInteractionUids[Rand.randomInt(0, allInteractionUids.length)];
	const interactionTypeRoll = Math.random();

	if (interactionTypeRoll < 0.7 && contentInstance.valueList.length > 0) {
		const target_nanoid = contentInstance.valueList[Rand.randomInt(0, contentInstance.valueList.length)][0];
		const pairKey = `${user_nanoid}|${target_nanoid}`;
		if (!interactedContentPairs.has(pairKey)) {
			contentInteractionTuples.push([user_nanoid, target_nanoid, interaction_uid_val]);
			interactedContentPairs.add(pairKey);
		}
	} else if (interactionTypeRoll < 0.9 && playlistInstance.valueList.length > 0) {
		const target_nanoid = playlistInstance.valueList[Rand.randomInt(0, playlistInstance.valueList.length)][0];
		const pairKey = `${user_nanoid}|${target_nanoid}`;
		if (!interactedPlaylistPairs.has(pairKey)) {
			playlistInteractionTuples.push([user_nanoid, target_nanoid, interaction_uid_val]);
			interactedPlaylistPairs.add(pairKey);
		}
	} else if (commentInstance.valueList.length > 0) {
		const target_nanoid = commentInstance.valueList[Rand.randomInt(0, commentInstance.valueList.length)][0];
		const pairKey = `${user_nanoid}|${target_nanoid}`;
		if (!interactedCommentPairs.has(pairKey)) {
			commentInteractionTuples.push([user_nanoid, target_nanoid, interaction_uid_val]);
			interactedCommentPairs.add(pairKey);
		}
	}
}
const userInteractionContentInstance = new user_interaction_content_T(contentInteractionTuples);
const userInteractionPlaylistInstance = new user_interaction_playlist_T(playlistInteractionTuples);
const userInteractionCommentInstance = new user_interaction_comment_T(commentInteractionTuples);

const channelFInstance = new channel_F(channelInstance, videoInstance, 0.3);

// =============================
// === EXPORT TO SQL FILES ===
// =============================
const outputPath = './sql_data';
if (!fs.existsSync(outputPath)) {
	fs.mkdirSync(outputPath);
}

const tablesToGenerate = [
	// { name: '01_resolution_a', instance: resolutionAInstance },
	// { name: '02_member_level_a', instance: memberLevelAInstance },
	// { name: '03_language_a', instance: languageAInstance },
	// { name: '04_indicative_rating_a', instance: indicativeRatingAInstance },
	// { name: '05_category_a', instance: categoryAInstance },
	// { name: '06_status_a', instance: statusAInstance },
	// { name: '07_interaction_a', instance: interactionAInstance },
	// { name: '08_login_provider_a', instance: loginProviderInstance },
	{ name: '09_tag_t', instance: tagInstance },
	{ name: '10_user_t', instance: userInstance },
	{ name: '11_channel_t', instance: channelInstance },
	{ name: '12_channel_external_link_t', instance: channelExternalLinkInstance },
	{ name: '13_user_admin_channel_t', instance: userAdminChannelInstance },
	{ name: '14_user_interest_channel_t', instance: userInterestChannelInstance },
	{ name: '15_content_t_video', instance: tempVideoContent },
	{ name: '16_content_t_live', instance: tempLiveContent },
	{ name: '17_content_t_short', instance: tempShortContent },
	{ name: '18_caption_t', instance: captionInstance },
	{ name: '19_user_watch_content_t', instance: userWatchContentInstance },
	{ name: '20_live_t', instance: liveInstance },
	{ name: '21_video_t', instance: videoInstance },
	{ name: '22_short_t', instance: shortInstance },
	{ name: '23_poll_t', instance: pollInstance },
	{ name: '24_poll_option_t', instance: pollOptionInstance },
	{ name: '25_poll_response_t', instance: pollResponseInstance },
	{ name: '26_comment_t', instance: commentInstance },
	{ name: '27_video_comment_t', instance: videoCommentInstance },
	{ name: '28_live_comment_t', instance: liveCommentInstance },
	{ name: '29_short_comment_t', instance: shortCommentInstance },
	{ name: '30_comment_reply_t', instance: commentReplyInstance },
	{ name: '31_poll_comment_t', instance: pollCommentInstance },
	{ name: '32_playlist_t', instance: playlistInstance },
	{ name: '33_playlist_content_t', instance: playlistContentInstance },
	{ name: '34_user_interaction_content_t', instance: userInteractionContentInstance },
	{ name: '35_user_interaction_playlist_t', instance: userInteractionPlaylistInstance },
	{ name: '36_user_interaction_comment_t', instance: userInteractionCommentInstance },
	{ name: '37_notification_t', instance: notificationInstance },
	{ name: '38_user_notified_t', instance: userNotifiedInstance },
	{ name: '39_playlist_tag_t', instance: playlistTagInstance },
	{ name: '40_content_tag_t', instance: contentTagInstance },
	// { name: '99_channel_f_updates', instance: channelFInstance },
];

tablesToGenerate.forEach(table => {
	// Un-comment the auxiliary tables for generation
	if (table.name.startsWith('01') || table.name.startsWith('02') || table.name.startsWith('03') || table.name.startsWith('04') || table.name.startsWith('05') || table.name.startsWith('06') || table.name.startsWith('07') || table.name.startsWith('08')) {
		const fileName = `${outputPath}/${table.name.toLowerCase()}.sql`;
		try {
			const sqlContent = table.instance.exportSQL();
			fs.writeFileSync(fileName, sqlContent);
			console.log(`Generated ${fileName}`);
		} catch (error) {
			console.error(`Error generating ${fileName}:`, error);
		}
	} else {
		const fileName = `${outputPath}/${table.name.toLowerCase()}.sql`;
		try {
			const sqlContent = table.instance.exportSQL();
			fs.writeFileSync(fileName, sqlContent);
			console.log(`Generated ${fileName}`);
		} catch (error) {
			console.error(`Error generating ${fileName}:`, error);
		}
	}
});

console.log('\nData generation complete! SQL files are in the "sql_data" directory.');