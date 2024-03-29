// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import HttpErrorConstructor from 'http-errors';
import { BadRequest, InternalServerError } from 'http-errors';

import { httpErrorMiddleware } from './httpErrorMiddleware';
import {
	callsNextWithErr,
	callsNextWithSentHeaders,
	catchesErrWithStatus,
} from './testTools';

const httpErrorMiddlewareCallsNextWithErr =
	callsNextWithErr(httpErrorMiddleware);

const httpErrorMiddlewareCatchesErrWithStatus =
	catchesErrWithStatus(httpErrorMiddleware);

describe('httpErrorMiddleware', () => {
	// Necessary since the consolveOverride is called after the getter for the logger is launced
	beforeAll(() => {
		jest.spyOn(console, 'log').mockImplementation(() => ({}));
	});

	httpErrorMiddlewareCallsNextWithErr('Error', new Error('This is an error'));

	httpErrorMiddlewareCallsNextWithErr('nonsense object', {
		veryImportantMessage: 'NOT',
	});

	httpErrorMiddlewareCatchesErrWithStatus(
		'HttpErrorConstructor 404',
		HttpErrorConstructor(404, 'http error!'),
		404
	);

	httpErrorMiddlewareCatchesErrWithStatus(
		'BadRequest',
		new BadRequest('bad request'),
		400
	);

	httpErrorMiddlewareCatchesErrWithStatus(
		'InternalServerError',
		new InternalServerError('internal error'),
		500
	);

	callsNextWithSentHeaders(
		httpErrorMiddleware,
		new InternalServerError('internal error')
	);
});
