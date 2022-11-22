import {
	mockFetchAudioFormatResponse,
	mockFetchAudioMetadataResponse,
} from '../test-helpers/mock/audio';
import fetchAudioInfoResponse from '../test-helpers/responses/audio/fetchAudioInfo.json';
import { fetchAudioInfo } from './audioInfo';

/**
 * This childProcess callback is used in multiple function
 *
 * @param cmd
 */
const mockSuccessExec = (cmd: string): Promise<string> =>
	Promise.resolve().then(() => {
		if (cmd.startsWith('youtube-dl --dump-json')) {
			return mockFetchAudioMetadataResponse;
		}

		if (cmd.startsWith('youtube-dl -F')) {
			return mockFetchAudioFormatResponse;
		}

		// The tests should never hit this, as the commands come directly from the function.
		return '';
	});

describe('audioInfo', () => {
	describe('fetchAudioInfo', () => {
		it('Should return the correct metadata', async () => {
			const result = await fetchAudioInfo(
				'https://www.youtube.com/watch?v=KpWhqdKxQtod',
				mockSuccessExec
			);
			expect(result).toStrictEqual(fetchAudioInfoResponse);
		});
	});
});
