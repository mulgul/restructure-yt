// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import { SPLAT } from 'triple-beam';
import { format } from 'util';
import * as winston from 'winston';

import { ITransformableInfo } from '../types';

/**
 * Console.log style formatting using node's `util.format`. We need this so we
 * can override console.{log, error, etc.} without issue.
 */
export const nodeUtilFormat = winston.format(
	(info: ITransformableInfo, _opts: unknown) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const args = info[SPLAT as unknown as string];
		if (args) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			info.message = format(info.message, ...args);
		}
		return info;
	}
);
