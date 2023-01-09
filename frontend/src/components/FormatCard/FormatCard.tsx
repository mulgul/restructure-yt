import * as React from 'react';
import { IFormat } from '../../types/responses';
import { convertFileSize } from '../../utils/convertFileSize';
import { DownloadButton, ButtonState } from '../DownloadButton';
import './FormatCard.css';

interface IFormatCardProps {
	format: IFormat;
	key: string;
}

export const FormatCard = ({ format, key }: IFormatCardProps) => {
	return (
		<div className="format-card-container">
			<div className="format-ext">
				<p className="format-p">File Extension: {`format.ext (${key})`}</p>
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
			<DownloadButton
				buttonState={ButtonState.Primary}
				onClick={() => null}
				label={'download'}
			/>
		</div>
	);
};
