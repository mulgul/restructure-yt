import express, { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

import { launchProcess } from '../utils/launchProcess';

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

router.get('/', async function (req: IGetRequestHandler, res) {
	const { query } = req;
	const decodedURI = decodeURIComponent(query.encodedURI);
	const cmd = `youtube-dl --dump-json ${decodedURI}`;
	const jsonDump = await launchProcess(cmd);

	const json: Record<string, unknown> = JSON.parse(jsonDump);
	const parsedMetadata = {
		title: json.title,
		duration: json.duration,
		updloadDate: json.upload_date,
		views: json.view_count,
		thumbnail: json.thumbnail,
	};

	res.send(parsedMetadata);
});

export default router;
