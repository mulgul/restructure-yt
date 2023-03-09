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
	IEventPayload,
	IGetRequestHandler,
} from './types';

const router = express.Router();
const { logger } = Log;

/**
 * GET: Retrieve audio metadata for a given video.
 */
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

/**
 * GET: Download the audio for a video. There is no event-streaming or tracking of the
 * download with this endpoint. It will downlaod the audio to disk, and then send the file.
 *
 * If you want to download the audio and track the download, you can use `/download/event` in conjunction
 * with `/download/retrieve`.
 */
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

/**
 * GET: Track a given download by event-stream. This will send the most recent information
 * for a download. This will download the file to disk, but not send the file. Use this
 * in conjunction with `/download/retrieve` in order to obtain the audio file.
 */
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
			'Access-Control-Allow-Origin': '*',
		};

		res.writeHead(200, headers);

		proc.stdout.on('data', (data) => {
			logger.info(`stdout: ${stripData(data)}`);

			const eventPayload: IEventPayload = {
				status: 'downloading',
				percent: '',
				eta: '',
			};

			const str = stripData(data);

			if (str.includes('ETA')) {
				res.write('data: ' + str + '\n\n');
			} else if (str.includes('100% of')) {
				eventPayload.status = 'completed';
				res.write('data: ' + str + '\n\n');
				res.end();
			}
		});

		proc.on('close', (code) => {
			logger.info(`Closing child process with status code: ${code}`);
			res.end();
		});

		proc.stderr.on('data', (data) => {
			logger.error(`stderr: ${stripData(data)}`);
			res.end();
		});
	}
);

/**
 * GET: Retrieve a file that was downloaded via `/download/event`. Delete the file
 * once it is sent.
 */
router.get(
	'/download/retrieve',
	checkQueryParams('title', 'ext'),
	async function (
		req: IGetRequestHandler<IAudioDownloadQueryParams>,
		res,
		next
	) {
		const { title, ext } = req.query;
		const fileName = createFileName(title);
		const options = {
			root: path.join(__dirname, '../downloads'),
		};
		const filePath = options.root + `/${fileName}.${ext}`;

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

export default router;
