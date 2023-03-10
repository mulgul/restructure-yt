// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import { IEventPayload } from '../routes/types';

/**
 * Function parses an input string to return a percent and an eta
 *
 * @param str value returned from an stdout on a process called on yt-dlp
 * ex: [download]   0.1% of   14.94MiB at    2.51MiB/s ETA 00:05
 */
export const stripDownloadData = (
	str: string
): Omit<IEventPayload, 'status'> => {
	const arr = str.split(' ').filter((ele) => {
		if (ele !== '') return ele;
	});
	return {
		percent: arr[1].replace('%', ''),
		eta: arr[arr.length - 1],
	};
};
