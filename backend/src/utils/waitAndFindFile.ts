import fs from 'fs';

import { Log } from '../logging/Log';

export const waitAndFindFile = (path: string, times = 100) => {
	if (times < 1) {
		return;
	}

	setTimeout(function () {
		Log.logger.info('checking if file exists');
		const fileExists = fs.existsSync(path);
		if (fileExists) {
			return;
		}

		waitAndFindFile(path, times - 1);
	}, 1);
};
