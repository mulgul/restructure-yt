import express from 'express';
import path from 'path';

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
	async function (req: IGetRequestHandler<IAudioDownloadQueryParams>, res, next) {
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

		// audio/webm (SHOULD THIS EXT be .weba)
		// audio/ogg -> opus
		// audio/mp4 -> m4a

		res.set('content-type', 'audio/mp3');

		res.sendFile(`${fileName}.${ext}`, options, (err) => {
			if (err) {
				next(err);
			}
		});
		res.download
	}
);

export default router;
