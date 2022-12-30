import * as React from 'react';
import { IFormat } from '../../types/responses';

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
				<h3>{format.ext}</h3>
			</div>
			<div className="format-codec">
				<p>{format.acodec}</p>
			</div>
			<div className="format-audobtr">
				<p>Audio Bitrate: {Math.floor(format.abr)} Kbps</p>
			</div>
			<div className="format-filesize">
				<p>File Size: {format.filesize}</p>
			</div>
		</div>
	);
};
