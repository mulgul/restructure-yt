// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import dotenv from 'dotenv';
import { format, transports } from 'winston';

import { nodeUtilFormat, stripTimestamp, timeStamp } from '../transformers';
import { ITransformableInfo } from '../types';

dotenv.config();

/**
 * Console transport for winston logger.
 */
export function consoleTransport(): transports.ConsoleTransportInstance {
	/**
	 * A simple printing format for how `ITransformableInfo` shows up.
	 */
	const simplePrint = format.printf((info: ITransformableInfo) => {
		if (info?.stack) {
			// If there is a stack dump (e.g. error middleware), show that in console
			return `${info?.timestamp} ${info?.level}: ${info?.message} \n ${info?.stack}`;
		}

		return `${info?.timestamp} ${info?.level}: ${info?.message}`;
	});

	const transformers = [stripTimestamp(), nodeUtilFormat(), timeStamp];

	if (!process.env.LOG_JSON) {
		transformers.push(format.colorize(), simplePrint);
	} else {
		transformers.push(format.prettyPrint());
	}

	return new transports.Console({
		level: process.env.LOG_LEVEL || 'info',
		handleExceptions: true,
		format: format.combine(...transformers),
		// Silence using `jest --silent`
		silent: process.env.NODE_ENV === 'test',
	});
}
