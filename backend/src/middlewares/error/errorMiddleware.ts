// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import { ErrorRequestHandler } from 'express';

import { Log } from '../../logging/Log';

/**
 * Handle Error instances.
 *
 * @param err unknown
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
export const errorMiddleware: ErrorRequestHandler = (
	err: Error,
	_req,
	res,
	next
): void => {
	if (res.headersSent || !(err instanceof Error)) {
		return next(err);
	}

	const info = {
		code: res.statusCode || 500,
		message: err.message ?? 'Internal Error',
		stack: err.stack,
	};

	Log.logger.error(info);

	res.status(info.code).send(info);
};
