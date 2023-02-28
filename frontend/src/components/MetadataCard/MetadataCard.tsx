import * as React from 'react';
import { IParsedMetadata } from '../../types/responses';
import './MetadataCard.css';

interface IMetadataCardProps {
	meta: IParsedMetadata;
}

export const MetaDataCard = ({ meta }: IMetadataCardProps) => {
	return (
		<div className="MetadataCard-container">
			<div className="MetadataCard-thumnail">
				<img
					className="MetadataCard-img"
					src={meta.thumbnail}
					alt="Thumbnail of staged video to be downloaded"
				/>
			</div>
			<div className="MetadataCard-title">
				<p className="MetadataCard-title-p">{meta.title}</p>
			</div>
			<div className="MetadataCard-views-uploadDate">
				<p className="MetadataCard-p">{meta.views}</p>
				<p className="MetadataCard-period">.</p>
				<p className="MetadataCard-p">{meta.uploadDate}</p>
			</div>
		</div>
	);
};
