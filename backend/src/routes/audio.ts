import express, { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

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

	res.send({
		URI: decodedURI,
	});
});

export default router;
