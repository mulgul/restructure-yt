// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { fetchAudioDownloadRetrieve } from '../../calls/audioDownloadRetrieve';
import { useDownloadFile } from '../../hooks/useDownloadFile';
import { mimeTypes } from '../../utils/mimeTypes';
import { BsDownload } from 'react-icons/bs';
import { Spinner } from '../UrlInput/Spinner';
import { IEventPayload } from '../../types/responses';

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
	downloadPercent: string;
	setDownloadPercent: React.Dispatch<React.SetStateAction<string>>;
}

export const DownloadButton: React.FC<IDownloadProps> = ({
	ext,
	title,
	url,
	id,
	downloadPercent,
	setDownloadPercent
}) => {
	const { Primary, Loading } = ButtonState;
	const [btnState, setbBtnState] = useState(Primary);
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const downloadRef = useRef<string>();
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

	const downloadFile = async (title: string, ext: string) => {
		try {
			return await fetchAudioDownloadRetrieve(title, ext);
		} catch (e) {
			console.error(e);
		}
	};

	const { ref, fileUrl, download, name } = useDownloadFile({
		apiDefinition: async () => await downloadFile(title, ext),
		preDownloading,
		postDownloading,
		onError: onErrorDownloadFile,
		getFileName,
		contentType: mimeTypes[ext],
	});

	useEffect(() => {
		downloadRef.current = downloadPercent;
	}, [downloadPercent]);

	const triggerEvent = () => {
		const eventSource = new EventSource(
			`http://127.0.0.1:8080/audio/download/event?encodedURI=${encodeURI(
				url
			)}&ext=${ext}&title=${title}&formatId=${id}`
		);
		eventSource.onmessage = async (e) => {
			const payload = JSON.parse(e.data) as IEventPayload;
			setDownloadPercent(payload.percent);
			if (payload.status === 'completed') {
				eventSource.close();
				download();
			}
		};
	};

	return (
		<div className="button-container">
			{showAlert ? <div>Error Downloading File</div> : <div></div>}
			<a href={fileUrl} download={name} ref={ref} className="button-ref"></a>
			<button onClick={triggerEvent} className="button-primary">
				{btnState === Loading && (
					<div className="download-spinner">
						<Spinner spinnerName={'loader-black'} />
					</div>
				)}
				{btnState === Primary && <BsDownload className="button-icon" />}
			</button>
			<p>{downloadPercent}%</p>
		</div>
	);
};
