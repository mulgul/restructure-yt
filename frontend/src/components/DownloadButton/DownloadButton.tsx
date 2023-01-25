import * as React from 'react';
import { useState } from 'react';
import { fetchAudioDownload } from '../../calls/audioDownload';
import { useDownloadFile } from '../../hooks/useDownloadFile';
import { mimeTypes } from '../../utils/mimeTypes';
import {BsDownload} from 'react-icons/bs'
import {Spinner} from '../UrlInput/Spinner'

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
		switch (ext) {
			case 'm4a':
				return `${title.split(' ').join('-')}.mp4`;
			default:
				return `${title.split(' ').join('-')}.${ext}`;
		}
	};

	const downloadFile = async (
		url: string,
		title: string,
		ext: string,
		id: string
	) => {
		return await fetchAudioDownload(encodeURIComponent(url), title, ext, id);
	};

	const { ref, fileUrl, download, name } = useDownloadFile({
		apiDefinition: () => downloadFile(url, title, ext, id),
		preDownloading,
		postDownloading,
		onError: onErrorDownloadFile,
		getFileName,
		contentType: mimeTypes[ext],
	});

	return (
		<div className="button-container">
			{showAlert ? <div>Error Downloading File</div> : <div></div>}
			<a href={fileUrl} download={name} className="button-primary" ref={ref} onClick={download}>
				{btnState === Loading && <div className='download-spinner'><Spinner/></div>}
				{btnState === Primary && <BsDownload className='button-icon'/>}
			</a>
		</div>
	);
};
