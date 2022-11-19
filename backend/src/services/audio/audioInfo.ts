import { launchExecProcess } from '../../utils/launchProcess';
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
	decodedURI: string
): Promise<IParsedMetadata> => {
	const cmd = `youtube-dl --dump-json ${decodedURI}`;

	let jsonDump: string;
	try {
		jsonDump = await launchExecProcess(cmd);
	} catch (err) {
		throw err as string;
	}

	const json: IMetadata = JSON.parse(jsonDump);

	let availableFormats: IAvailableFormats;
	try {
		availableFormats = await fetchAudioFormats(decodedURI);
	} catch (err) {
		throw 'Invalid url. Not able to grab video metadata.';
	}

	const formats = parseFormats(availableFormats, json.formats);

	return {
		title: json.title,
		duration: json.duration,
		uploadDate: json.upload_date,
		views: json.view_count,
		thumbnail: json.thumbnail,
		formats,
	};
};

export const fetchAudioFormats = async (
	decodedURI: string
): Promise<IAvailableFormats> => {
	const cmd = `youtube-dl -F ${decodedURI} | grep audio`;

	let fetchedAudioList: string;
	try {
		fetchedAudioList = await launchExecProcess(cmd);
	} catch (err) {
		throw err as string;
	}

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

export const parseFormats = (
	availFormats: IAvailableFormats,
	formats: IFormat[]
) => {
	return formats.filter((form) => availFormats.includes(form.format_id));
};
