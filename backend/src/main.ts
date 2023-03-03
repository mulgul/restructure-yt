// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import express from 'express';

import { Log } from './logging/Log';
import { errorMiddleware, httpErrorMiddleware } from './middlewares/error';
import { httpLoggerCreate } from './middlewares/logger';
import audioRouter from './routes/audio';

const app = express();
const port = 8080; // default port to listen
const { logger } = Log;

// Pre middleware
app.use(httpLoggerCreate(logger));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Routes
app.use('/audio', audioRouter);

// Post middleware
app.use(httpErrorMiddleware);
app.use(errorMiddleware);

// define a route handler for the default home page
app.get('/', (_, res) => {
	res.sendFile(__dirname + '/static/downtime.html');
});

// start the Express server
app.listen(port, () => {
	logger.info(`Server started at http://localhost:${port}`);
});
