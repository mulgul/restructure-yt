import { launchSpawnProcess } from '../../utils/launchProcess';

export const fetchAudioDownload = async (
	formatId: string,
	writePath: string,
	decodedURI: string
) => {
	const proc = await launchSpawnProcess('youtube-dl', [
		'-i',
		'-f',
		formatId,
		'-o',
		writePath,
		decodedURI,
	]);

	if (proc === 1) {
		throw Error('Unexpected error downloading file.');
	}

	return writePath;
};
