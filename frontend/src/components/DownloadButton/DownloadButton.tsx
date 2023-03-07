// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import * as React from 'react';
import { useState } from 'react';

import { fetchAudioDownload } from '../../calls/audioDownload';
import { fetchAudioDownloadEvent } from '../../calls/audioDownloadEvent';
import { useDownloadFile } from '../../hooks/useDownloadFile';
import { mimeTypes } from '../../utils/mimeTypes';
import { BsDownload } from 'react-icons/bs';
import { Spinner } from '../UrlInput/Spinner';

import './DownloadButton.css';

export enum ButtonState {
	Primary = 'Primary',
	Loading = 'Loading',
}

interface IDownloadProps {
	ext: string;
	title: string;
	url: string;
	id: string;
}

export const DownloadButton: React.FC<IDownloadProps> = ({
	ext,
	title,
	url,
	id,
}) => {
	const { Primary, Loading } = ButtonState;
	const [btnState, setbBtnState] = useState(Primary);
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [downloadPercent, setDownloadPercent] = useState<string>('');
	const preDownloading = () => setbBtnState(Loading);
	const postDownloading = () => setbBtnState(Primary);

	const onErrorDownloadFile = () => {
		setbBtnState(ButtonState.Primary);
		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
		}, 3000);
	};

	const getFileName = () => {
		return `${title.split(' ').join('-')}.${ext}`;
	};

	const downloadFile = async (
		url: string,
		title: string,
		ext: string,
		id: string
	): Promise<Blob> => {
		const done = true;
		if (done) {
			throw Error('This is thrown')
		}
		try {
			return await fetchAudioDownload(encodeURIComponent(url), title, ext, id);
		} catch (e) {
			console.error(e);
		}
	};

	const downloadEvent = async (
		title: string,
		ext: string
	): Promise<Response> => {
		return await fetchAudioDownloadEvent(encodeURIComponent(url), title, ext, id);;
	};

	const { ref, fileUrl, download, name } = useDownloadFile({
		apiDefinition: async () => await downloadFile(url, title, ext, id),
		apiEventDefinition: async () => await downloadEvent(title, ext),
		setDownloadPercent,
		preDownloading,
		postDownloading,
		onError: onErrorDownloadFile,
		getFileName,
		contentType: mimeTypes[ext],
		title,
		ext,
		encodedURI: encodeURIComponent(url),
		id,
	});

	return (
		<div className="button-container">
			{showAlert ? <div>Error Downloading File</div> : <div></div>}
			<a href={fileUrl} download={name} ref={ref} className="button-ref"></a>
			<button onClick={download} className="button-primary">
				{btnState === Loading && (
					<div className="download-spinner">
						<Spinner spinnerName={'loader-black'} />
					</div>
				)}
				{btnState === Primary && <BsDownload className="button-icon" />}
			</button>
			<div>{downloadPercent}</div>
		</div>
	);
};
