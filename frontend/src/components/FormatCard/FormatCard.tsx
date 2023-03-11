// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import * as React from 'react';
import { useState } from 'react';

import { IFormat } from '../../types/responses';
import { convertFileSize } from '../../utils/convertFileSize';
import { DownloadButton } from '../DownloadButton';
import './FormatCard.css';

interface IFormatCardProps {
	ext: string;
	format: IFormat;
	id: string;
	title: string;
	url: string;
	downloadPercent: string;
	setDownloadPercent: React.Dispatch<React.SetStateAction<string>>;
}

export const FormatCard = ({
	ext,
	format,
	id,
	title,
	url,
	setDownloadPercent,
}: IFormatCardProps) => {
	const [downloadBarPercent, setDownloadBarPercent] = useState<string>('');
	const downloadNum = parseInt(downloadBarPercent);
	console.log(downloadNum, 'DOWNLOAD NUM');

	return (
		<div
			className="format-card-container"
			style={{
				background: `linear-gradient(90deg, #8c35ff ${downloadNum}%, #f9f9f9 ${downloadNum}%)`,
			}}
		>
			<div className="format-codec">
				<p className="format-p">File Type: {format.audio_ext}</p>
			</div>
			<div className="format-audobtr">
				<p className="format-p">Audio Bitrate: {Math.floor(format.abr)} Kbps</p>
			</div>
			<div className="format-filesize">
				<p className="format-p">
					File Size: {convertFileSize(format.filesize, true)}
				</p>
			</div>
			<DownloadButton
				ext={ext}
				title={title}
				url={url}
				id={id}
				setDownloadPercent={setDownloadPercent}
				downloadBarPercent={downloadBarPercent}
				setDownloadBarPercent={setDownloadBarPercent}
			/>
		</div>
	);
};
