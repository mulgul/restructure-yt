// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import { useRef, useState } from 'react';

interface DownloadFileProps {
	readonly apiDefinition: () => Promise<Blob>;
	readonly apiEventDefinition: () => Promise<Response>;
	readonly preDownloading: () => void;
	readonly postDownloading: () => void;
	readonly setDownloadPercent: React.Dispatch<React.SetStateAction<string>>;
	readonly onError: () => void;
	readonly getFileName: () => string;
	readonly contentType: string;
	title: string;
	ext: string;
	encodedURI: string;
	id: string;
}

interface DownloadedFileInfo {
	readonly download: () => Promise<void>;
	readonly ref: React.MutableRefObject<HTMLAnchorElement | null>;
	readonly name: string | undefined;
	readonly fileUrl: string | undefined;
}

export const useDownloadFile = ({
	apiDefinition,
	apiEventDefinition,
	setDownloadPercent,
	preDownloading,
	postDownloading,
	onError,
	getFileName,
	contentType,
	title,
	ext,
	encodedURI,
	id
}: DownloadFileProps): DownloadedFileInfo => {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const [fileUrl, setFileUrl] = useState<string>();
	const [name, setFileName] = useState<string>();

	const readDownloadEvent = async () => {
		return new Promise((resolve, reject) => {
			const event = new EventSource(`/audio/download/event?encodedURI=${encodedURI}&ext=${ext}&title=${title}&formatId=${id}`);

			event.onmessage = (res) => {

				console.log('RES: ', res);
				console.log('DATA: ', res.data);
				setDownloadPercent(res.data);

				if (res.data.includes('100%')) {
					resolve('Hi');
				}
			}
		});
		try {
			const event = await apiEventDefinition();
			const reader = event.body.getReader();
			const contentLength = +event.headers.get('Content-length');

			let receivedLength = 0; // received that many bytes at the moment
			let isDone = true;
			const chunks = []; // array of received binary chunks (comprises the body)
			while (isDone) {
				const { done, value } = await reader.read();

				if (done) {
					isDone = false;
				}

				chunks.push(value);
				receivedLength += value.length;

				console.log(`Received ${receivedLength} of ${contentLength}`);
			}

			// Step 4: concatenate chunks into single Uint8Array
			const chunksAll = new Uint8Array(receivedLength); // (4.1)
			let position = 0;
			for (const chunk of chunks) {
				chunksAll.set(chunk, position); // (4.2)
				position += chunk.length;
			}

		} catch (e) {
			console.error(e);
		}
	};

	const download = async () => {
		try {
			preDownloading();
			await readDownloadEvent();
			const data = await apiDefinition();
			const url = URL.createObjectURL(new Blob([data], { type: contentType }));
			setFileUrl(url);
			setFileName(getFileName());
			ref.current?.click();
			postDownloading();
		} catch (error) {
			onError();
		}
	};

	return { download, ref, fileUrl, name };
};
