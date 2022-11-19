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
	async function (req: IGetRequestHandler<IAudioInfoQueryParams>, res, next) {
		const { query } = req;
		const decodedURI = decodeURIComponent(query.encodedURI);
		let parsedMetadata: IParsedMetadata;
		try {
			parsedMetadata = await fetchAudioInfo(decodedURI);
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
	async function (req: IGetRequestHandler<IAudioDownloadQueryParams>, res) {
		const { encodedURI, title, formatId, ext, addMetadata } = req.query;
		const addMetadataArg = addMetadata === 'true';
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
				decodedURI,
				addMetadataArg
			);
		} catch (err) {
			return res.status(400).json({ message: err });
		}

		// res.set('content-type', 'audio/mp3');

		// res.sendFile(`${fileName}.${ext}`, options, (err) => {
		// 	if (err) {
		// 		res.status(500).json({ message: 'Unexpected server error.' });
		// 	}
		// });
	}
);

export default router;
