import express, { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

import { fetchAudioInfo } from '../services/audio';

type IGetRequestHandler = Request<
	ParamsDictionary,
	unknown,
	unknown,
	IAudioInfoQueryParams
>;

interface IAudioInfoQueryParams extends Query {
	encodedURI: string;
}

const router = express.Router();

router.get('/metadata', async function (req: IGetRequestHandler, res) {
	const { query } = req;
	const decodedURI = decodeURIComponent(query.encodedURI);
	const parsedMetadata = await fetchAudioInfo(decodedURI);

	res.send(parsedMetadata);
});

export default router;
