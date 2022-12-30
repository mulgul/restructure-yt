import { request } from './request';
import { IParsedMetadata } from '../types/responses';

export const fetchAudioMetadata = (encodedURI: string) => {
	return request<IParsedMetadata>(
		`/audio/metadata?encodedURI=${encodedURI}`,
		'json',
		{
			'Content-Type': 'application/json',
			Accept: 'application/json',
		}
	);
};
