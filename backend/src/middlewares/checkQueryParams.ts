import { NextFunction, Request, Response } from 'express';
import { BadRequest } from 'http-errors';

export const checkQueryParams = (...args: string[]) => {
	return (req: Request, _: Response, next: NextFunction) => {
		const errQueryParams: string[] = [];

		for (const key of args) {
			if (!req.query[key]) {
				errQueryParams.push(`Query parameter: ${key} must be attached`);
			}
		}

		if (errQueryParams.length > 0) {
			return next(new BadRequest(errQueryParams.join(' - ')));
		}

		return next();
	};
};
