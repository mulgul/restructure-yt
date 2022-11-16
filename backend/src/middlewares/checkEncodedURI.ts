import { NextFunction, Request, Response } from 'express';
import { BadRequest } from 'http-errors';

export const checkEncodedURI = (
	req: Request,
	_: Response,
	next: NextFunction
): void => {
	if (!req.query.encodedURI) {
		next(new BadRequest('encodedURI must be attached'));
	}
	next();
};
