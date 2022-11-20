import { launchSpawnProcess } from '../../utils/launchProcess';

/**
 * This will launch a spawn child process in order to download the requested link.
 * The spawn processs returns a status code which has an err message attached if its a 1.
 *
 * @param formatId Audio Format ID. This decides what we are going to fetch/query.
 * @param writePath This is the local write path the download be written in.
 * @param decodedURI The URI in which we are going to download.
 * @param addMetadata Args that determines if we will attach `--add-metadata`
 */
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

	if (proc.code === 1) {
		throw Error(`Unexpected error downloading file: ${proc.stderr}`);
	}

	return writePath;
};
