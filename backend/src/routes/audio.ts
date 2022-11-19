import express from 'express';
import path from 'path';

import { checkQueryParams } from '../middlewares';
import { fetchAudioDownload } from '../services/audio/audioDownload';
import { fetchAudioInfo } from '../services/audio/audioInfo';
import { IParsedMetadata } from '../services/audio/types';
import { createFileName } from '../utils/createFileName';
import {
	IAudioDownloadQueryParams,
	IAudioInfoQueryParams,
	IGetRequestHandler,
} from './types';

const router = express.Router();

router.get(
	'/metadata',
	checkQueryParams('encodedURI'),
	async function (req: IGetRequestHandler<IAudioInfoQueryParams>, res) {
		const { query } = req;
		const decodedURI = decodeURIComponent(query.encodedURI);
		let parsedMetadata: IParsedMetadata;
		try {
			parsedMetadata = await fetchAudioInfo(decodedURI);
		} catch (err) {
			return res
				.status(400)
				.json({ message: 'Invalid url. Not able to grab video metadata.' });
		}
		res.set('content-type', 'application/json');
		res.send(parsedMetadata);
	}
);

router.get(
	'/download',
	checkQueryParams('encodedURI', 'title', 'formatId', 'ext'),
	async function (req: IGetRequestHandler<IAudioDownloadQueryParams>, res) {
		// TODO: addMetadata option
		const { encodedURI, title, formatId, ext } = req.query;
		const decodedURI = decodeURIComponent(encodedURI);
		const fileName = createFileName(title);
		const options = {
			root: path.join(__dirname, '../downloads'),
		};

		const filePath = await fetchAudioDownload(
			formatId,
			options.root + `/${fileName}.${ext}`,
			decodedURI
		);

		// res.set('content-type', 'audio/mp3');

		// res.sendFile(`${fileName}.${ext}`, options, (err) => {
		// 	if (err) {
		// 		res.status(500).json({ message: 'Unexpected server error.' });
		// 	}
		// });
	}
);

export default router;
