// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import { request } from './request';
import { mimeTypes } from '../utils/mimeTypes';

export const fetchAudioDownloadRetrieve = (
	title: string,
	ext: string,
) => {
	const path = `/audio/download/retrieve?ext=${ext}&title=${title}`;
	const contentType = mimeTypes[ext];
	return request<Blob>(path, 'blob', {
		headers: {
			'Content-Type': contentType,
		},
	});
};
