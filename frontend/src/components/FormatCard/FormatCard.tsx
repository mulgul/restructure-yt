import * as React from 'react';
import { IFormat } from '../../types/responses';
import './FormatCard.css';

interface IFormatCardProps {
	format: IFormat;
	title: string;
	url: string;
	key: string;
}

export const FormatCard = ({ format, title, url, key }: IFormatCardProps) => {
	return (
		<div className="format-card-container">
			<div className="format-ext">
				<p className="format-p">File Extension: {format.ext}</p>
			</div>
			<div className="format-codec">
				<p className="format-p">{format.acodec}</p>
			</div>
			<div className="format-audobtr">
				<p className="format-p">Audio Bitrate: {Math.floor(format.abr)} Kbps</p>
			</div>
			<div className="format-filesize">
				<p className="format-p">File Size: {format.filesize}</p>
			</div>
			<button>Download</button>
		</div>
	);
};
