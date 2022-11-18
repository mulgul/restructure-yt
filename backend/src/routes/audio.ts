import express from 'express';

import { fetchAudioInfo } from '../services/audioInfo';
import { IGetRequestHandler } from './types';

const router = express.Router();

router.get('/metadata', async function (req: IGetRequestHandler, res) {
	const { query } = req;
	const decodedURI = decodeURIComponent(query.encodedURI);
	const parsedMetadata = await fetchAudioInfo(decodedURI);

	res.send(parsedMetadata);
});

export default router;
