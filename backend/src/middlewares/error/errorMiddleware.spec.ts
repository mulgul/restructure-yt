// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import { BadRequest, InternalServerError } from 'http-errors';

import { errorMiddleware } from './errorMiddleware';
import {
	callsNextWithErr,
	callsNextWithSentHeaders,
	catchesErrWithStatus,
} from './testTools';

const errorMiddlewareCallsNextWithErr = callsNextWithErr(errorMiddleware);

const errorMiddlewareCatchesErrWithStatus =
	catchesErrWithStatus(errorMiddleware);

describe('errorMiddleware', () => {
	// Necessary since the consolveOverride is called after the getter for the logger is launced
	beforeAll(() => {
		jest.spyOn(console, 'log').mockImplementation(() => ({}));
	});

	errorMiddlewareCallsNextWithErr('nonsense object', {
		veryImportantMessage: 'NOT',
	});

	errorMiddlewareCatchesErrWithStatus(
		'Error',
		new Error('This is an error'),
		500
	);

	errorMiddlewareCatchesErrWithStatus(
		'BadRequest (http-error which extends Error) (code gets changed to 500)',
		new BadRequest('bad request'),
		500
	);

	errorMiddlewareCatchesErrWithStatus(
		'InternalServerError (http-error which extends Error)',
		new InternalServerError('internal error'),
		500
	);

	callsNextWithSentHeaders(errorMiddleware, new Error('This is an error'));
});
