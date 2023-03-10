// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import { stripDownloadData } from './stripDownloadData';

describe('stripDownloadData', () => {
	it('Should correctly format return value', () => {
		const data = stripDownloadData(
			'[download]   0.1% of   14.94MiB at    2.51MiB/s ETA 00:05'
		);
		expect(data).toStrictEqual({
			percent: '0.1',
			eta: '00:05',
		});
	});
});
