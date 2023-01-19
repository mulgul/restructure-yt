import * as React from 'react';
import { useState } from 'react';
import { fetchAudioDownload } from '../../calls/audioDownload';
import { useDownloadFile } from '../../hooks/useDownloadFile';
import { mimeTypes } from '../../utils/mimeTypes';
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
		// throw new Error("uncomment this line to mock failure of API");
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

	// TODO: Write showAlert logic
	return (
		<div className="button-container">
			<a href={fileUrl} download={name} className="hidden" ref={ref}></a>
			<button onClick={download} className="button-primary">
				{btnState === Loading && 'isLoading'}
				{btnState === Primary && 'Download'}
			</button>
		</div>
	);
};
