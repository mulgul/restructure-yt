// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import { spawn } from 'child_process';
import express from 'express';
import fs from 'fs';
import path from 'path';

import { Log } from '../logging/Log';
import { checkQueryParams } from '../middlewares';
import { fetchAudioDownload } from '../services/audio/audioDownload';
import { fetchAudioInfo } from '../services/audio/audioInfo';
import { IParsedMetadata } from '../services/audio/types';
import { createFileName } from '../utils/createFileName';
import { launchExecProcessPromise } from '../utils/launchProcess';
import { stripData } from '../utils/stripData';
import {
	IAudioDownloadQueryParams,
	IAudioInfoQueryParams,
	IGetRequestHandler,
} from './types';

const router = express.Router();
const { logger } = Log;

router.get(
	'/metadata',
	checkQueryParams('encodedURI'),
	async function (req: IGetRequestHandler<IAudioInfoQueryParams>, res, next) {
		const { query } = req;
		const decodedURI = decodeURIComponent(query.encodedURI);
		let parsedMetadata: IParsedMetadata;
		try {
			parsedMetadata = await fetchAudioInfo(
				decodedURI,
				launchExecProcessPromise
			);
			res.set('content-type', 'application/json');
			res.send(parsedMetadata);
		} catch (err) {
			next(err);
		}
	}
);

router.get(
	'/download',
	checkQueryParams('encodedURI', 'title', 'formatId', 'ext'),
	async function (
		req: IGetRequestHandler<IAudioDownloadQueryParams>,
		res,
		next
	) {
		const { encodedURI, title, formatId, ext } = req.query;
		const decodedURI = decodeURIComponent(encodedURI);
		const fileName = createFileName(title);
		const options = {
			root: path.join(__dirname, '../downloads'),
		};

		let filePath: string;
		try {
			filePath = await fetchAudioDownload(
				formatId,
				options.root + `/${fileName}.${ext}`,
				decodedURI
			);
		} catch (err) {
			return next(err);
		}

		res.sendFile(`${fileName}.${ext}`, options, (err) => {
			if (err) {
				next(err);
			}

			fs.unlink(filePath, (err) => {
				if (err) {
					logger.error(err);
				}
				logger.info(`File Path: ${filePath} DELETED`);
			});
		});
	}
);

router.get(
	'/download/event',
	checkQueryParams('encodedURI', 'title', 'formatId', 'ext'),
	async function (req: IGetRequestHandler<IAudioDownloadQueryParams>, res) {
		const { encodedURI, title, formatId, ext } = req.query;
		const decodedURI = decodeURIComponent(encodedURI);
		const fileName = createFileName(title);
		const writePath = path.join(
			__dirname,
			'../downloads',
			`/${fileName}.${ext}`
		);
		const procArgs = ['-i', '-f', formatId, '-o', writePath, decodedURI];
		const proc = spawn('yt-dlp', procArgs, { detached: true });
		const headers = {
			'Content-Type': 'text/event-stream',
			Connection: 'keep-alive',
			'Cache-Control': 'no-cache',
		};

		res.writeHead(200, headers);

		proc.stdout.on('data', (data) => {
			console.log('TYPEOF: ', typeof data);
			Log.logger.info(`stdout: ${stripData(data)}`);

			const str = data.toString();

			if (str.includes('ETA') || str.includes('100% of')) {
				res.write('data: ' + data.toString() + '\n\n');
			}
		});

		proc.on('close', function (code) {
			console.log(code);
			res.end();
		});

		proc.stderr.on('data', function (data) {
			Log.logger.info(`stderr: ${stripData(data)}`);
			res.end();
		});
	}
);

export default router;
