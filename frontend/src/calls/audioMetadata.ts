import { request } from './request';

export const fetchAudioMetadata = (encodedURI: string) => {
	return request(`/audio/metadata?encodedURI=${encodedURI}`, 'json', {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	});
};
