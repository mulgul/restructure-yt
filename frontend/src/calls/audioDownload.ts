// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import { request } from './request';
import { mimeTypes } from '../utils/mimeTypes';

export const fetchAudioDownload = (
	encodedURI: string,
	title: string,
	ext: string,
	id: string
) => {
	const path = `/audio/download?encodedURI=${encodedURI}&ext=${ext}&title=${title}&formatId=${id}`;
	const contentType = mimeTypes[ext];
	return request<Blob>(path, 'blob', {
		headers: {
			'Content-Type': contentType,
		},
	});
};
