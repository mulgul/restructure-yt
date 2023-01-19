import { BadRequest } from 'http-errors';

import {
	IAvailableFormats,
	IFormat,
	IMetadata,
	IParsedMetadata,
} from './types';

/**
 * Fetch audio info, and parse the metadata.
 *
 * @param decodedURI
 */
export const fetchAudioInfo = async (
	decodedURI: string,
	childProcessCall: (cmd: string) => Promise<string>
): Promise<IParsedMetadata> => {
	const cmd = `yt-dlp --dump-json ${decodedURI}`;

	let jsonDump: string;
	try {
		jsonDump = await childProcessCall(cmd);
	} catch (err) {
		// This is the first call we are making with the given decodedURI
		// If there is an error it will most likely be from a bad request.
		throw new BadRequest(err as string);
	}

	const json: IMetadata = JSON.parse(jsonDump);

	let availableFormats: IAvailableFormats;
	try {
		availableFormats = await fetchAudioFormats(decodedURI, childProcessCall);
	} catch (err) {
		// This will end up being returned as an InternalServer error 500.
		throw Error(err as string);
	}

	const formats = parseFormats(availableFormats, json.formats);

	return {
		title: json.title,
		channel: json.channel,
		duration: json.duration,
		uploadDate: json.upload_date,
		views: json.view_count,
		thumbnail: json.thumbnail,
		formats,
	};
};

/**
 * Fetch audio formats for a given decodedURI. This will parse all formats to make sure
 * we only use audio compatible downloads.
 *
 * @param decodedURI The decodedURI to query with yt-dlp
 * @param childProcessCall This will call a child process to run the given command.
 */
export const fetchAudioFormats = async (
	decodedURI: string,
	childProcessCall: (cmd: string) => Promise<string>
): Promise<IAvailableFormats> => {
	const cmd = `yt-dlp -F ${decodedURI} | grep audio`;

	let fetchedAudioList: string;
	try {
		fetchedAudioList = await childProcessCall(cmd);
	} catch (err) {
		throw err as string;
	}

	// TODO: clean this logic up.
	const audioList = fetchedAudioList
		.split(/\r?\n/)
		.map((str) => str.replace(/\s+/g, ' ').trim())
		.map((str) =>
			str
				.replace(new RegExp('\\b(audio|only)\\b', 'gi'), ' ')
				.replace(/\s{2,}/g, ' ')
				.replace(/\s+(\W)/g, '$1')
		)
		.filter((str) => str !== '')
		.map((str) => {
			const splitData = str.split(',');
			const splitFormatting = splitData[0].split(' ');

			return splitFormatting[0];
		});

	return audioList;
};

const parseFormats = (availFormats: IAvailableFormats, formats: IFormat[]) => {
	return formats.filter((form) => availFormats.includes(form.format_id));
};
