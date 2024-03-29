// MIT License
//
// Copyright (c) 2023 github.com/mulgul

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

export interface IEventPayload {
	status: string;
	percent: string;
	eta: string;
}
