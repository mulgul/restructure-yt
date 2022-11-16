import express from 'express';

import { checkEncodedURI } from './middlewares';
import audioRouter from './routes/audio';

const app = express();
const port = 8080; // default port to listen

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Routes
app.use('/audio', checkEncodedURI, audioRouter);

// define a route handler for the default home page
app.get('/', (_, res) => {
	res.json({ message: 'ok' });
});

// start the Express server
app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
