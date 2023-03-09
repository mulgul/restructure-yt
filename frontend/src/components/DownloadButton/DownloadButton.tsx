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
	const [downloadPercent, setDownloadPercent] = useState<string>();
	const [isCompleted, setIsCompleted] = useState<boolean>(false);
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

	const downloadFile = async (
		url: string,
		title: string,
		ext: string,
		id: string
	) => {
		try {
			return await fetchAudioDownloadRetrieve(title, ext);
		} catch (e) {
			console.error(e);
		}
	};

	const { ref, fileUrl, download, name } = useDownloadFile({
		apiDefinition: async () => await downloadFile(url, title, ext, id),
		preDownloading,
		postDownloading,
		onError: onErrorDownloadFile,
		getFileName,
		contentType: mimeTypes[ext],
	});

	useEffect(() => {
		downloadRef.current = downloadPercent;
		console.log(
			downloadPercent,
			'DOWNLOAD PERCENT IN USE EFFECT DOWNLOAD BUTTON'
		);
	}, [downloadPercent]);

	const triggerEvent = () => {
		const eventSource = new EventSource(
			'http://127.0.0.1:8080/audio/download/event?encodedURI=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dxuc9C-C6Ldw&ext=m4a&title=FKJ%20Live%20at%20La%20F%C3%A9e%20Electricit%C3%A9%2C%20Paris&formatId=140'
		);
		eventSource.onmessage = (e) => {
			const payload = JSON.parse(e.data) as IEventPayload;
			setDownloadPercent(payload.percent);
			if (payload.status === 'completed') {
				setIsCompleted(true);
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
