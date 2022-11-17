import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

export type IGetRequestHandler = Request<
	ParamsDictionary,
	unknown,
	unknown,
	IAudioInfoQueryParams
>;

export interface IAudioInfoQueryParams extends Query {
	encodedURI: string;
}
