// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import { request } from './request';

export const fetchAudioDownloadEvent = async (
    encodedURI: string,
	title: string,
	ext: string,
	id: string
) => {
	const path = `/audio/download/event?encodedURI=${encodedURI}&ext=${ext}&title=${title}&formatId=${id}`;
    
	return await request<Response>(path, 'stream', {
		headers: {
			'Content-Type': 'text/event-stream',
		},
	});;
};
