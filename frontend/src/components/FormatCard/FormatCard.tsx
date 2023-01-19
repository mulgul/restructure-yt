import * as React from 'react';
import { IFormat } from '../../types/responses';
import { convertFileSize } from '../../utils/convertFileSize';
import { DownloadButton, ButtonState } from '../DownloadButton';
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
	return (
		<div className="format-card-container">
			<div className="format-ext">
				<p className="format-p">File Extension: {`format.ext (${id})`}</p>
			</div>
			<div className="format-codec">
				<p className="format-p">{format.acodec}</p>
			</div>
			<div className="format-audobtr">
				<p className="format-p">Audio Bitrate: {Math.floor(format.abr)} Kbps</p>
			</div>
			<div className="format-filesize">
				<p className="format-p">
					File Size: {convertFileSize(format.filesize, true)}
				</p>
			</div>
			<DownloadButton ext={ext} title={title} url={url} id={id} />
		</div>
	);
};