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
}

export const FormatCard = ({
	ext,
	format,
	id,
	title,
	url,
}: IFormatCardProps) => {

	const [downloadPercent, setDownloadPercent] = useState<string>();

	return (
		<div className="format-card-container" style={{background: `linear-gradient(90deg, #f9f9f9 50%, #8c35ff 50%)`}}>
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
			<DownloadButton ext={ext} title={title} url={url} id={id} downloadPercent={downloadPercent} setDownloadPercent={setDownloadPercent} />
		</div>
	);
};
