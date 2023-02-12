import express from 'express';
import fs from 'fs';
import path from 'path';

import { Log } from '../logging/Log';
import { checkQueryParams } from '../middlewares';
import { fetchAudioDownload } from '../services/audio/audioDownload';
import { fetchAudioInfo } from '../services/audio/audioInfo';
import { IParsedMetadata } from '../services/audio/types';
import { createFileName } from '../utils/createFileName';
import { launchExecProcess } from '../utils/launchProcess';
import {
	IAudioDownloadQueryParams,
	IAudioInfoQueryParams,
	IGetRequestHandler,
} from './types';

const router = express.Router();
const { logger } = Log;

router.get(
	'/metadata',
	checkQueryParams('encodedURI'),
	async function (req: IGetRequestHandler<IAudioInfoQueryParams>, res, next) {
		const { query } = req;
		const decodedURI = decodeURIComponent(query.encodedURI);
		let parsedMetadata: IParsedMetadata;
		try {
			parsedMetadata = await fetchAudioInfo(decodedURI, launchExecProcess);
			res.set('content-type', 'application/json');
			res.send(parsedMetadata);
		} catch (err) {
			next(err);
		}
	}
);

router.get(
	'/download',
	checkQueryParams('encodedURI', 'title', 'formatId', 'ext'),
	async function (
		req: IGetRequestHandler<IAudioDownloadQueryParams>,
		res,
		next
	) {
		const { encodedURI, title, formatId, ext } = req.query;
		const decodedURI = decodeURIComponent(encodedURI);
		const fileName = createFileName(title);
		const options = {
			root: path.join(__dirname, '../downloads'),
		};

		let filePath: string;
		try {
			filePath = await fetchAudioDownload(
				formatId,
				options.root + `/${fileName}.${ext}`,
				decodedURI
			);
		} catch (err) {
			return next(err);
		}

		res.sendFile(`${fileName}.${ext}`, options, (err) => {
			if (err) {
				next(err);
			}

			fs.unlink(filePath, (err) => {
				if (err) {
					logger.error(err);
				}
				logger.info(`File Path: ${filePath} DELETED`);
			});
		});
	}
);

export default router;
