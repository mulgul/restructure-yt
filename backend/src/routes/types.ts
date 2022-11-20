import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

export type IGetRequestHandler<T> = Request<
	ParamsDictionary,
	unknown,
	unknown,
	T
>;

export interface IAudioInfoQueryParams extends Query {
	encodedURI: string;
}

export interface IAudioDownloadQueryParams extends IAudioInfoQueryParams {
	formatId: string;
	title: string;
	ext: string;
}
