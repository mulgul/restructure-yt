import { launchProcess } from '../utils/launchProcess';

export const fetchAudioInfo = async (decodedURI: string) => {
	const cmd = `youtube-dl --dump-json ${decodedURI}`;
	const jsonDump = await launchProcess(cmd);
	// TODO: specify type info
	// TODO: parse Formats
	const json: Record<string, unknown> = JSON.parse(jsonDump);

	return {
		title: json.title,
		duration: json.duration,
		updloadDate: json.upload_date,
		views: json.view_count,
		thumbnail: json.thumbnail,
	};
};
