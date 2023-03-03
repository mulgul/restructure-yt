// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import * as React from 'react';
import { IParsedMetadata } from '../../types/responses';
import { formatViews } from '../../utils/formatViews';
import { formatDate } from '../../utils/formatDate';
import { formatDuration } from '../../utils/formatDuration';
import './MetadataCard.css';

interface IMetadataCardProps {
	meta: IParsedMetadata;
}

export const MetaDataCard = ({ meta }: IMetadataCardProps) => {
	return (
		<div className="metadata-card-container">
			<div className="metadata-card-thumnail">
				<img
					className="metadata-card-img"
					src={meta.thumbnail}
					alt="Thumbnail of staged video to be downloaded"
				/>
			</div>
			<div className="metadata-card-info">
				<div>
					<p className="metadata-card-title-p">{meta.title}</p>
				</div>
				<div className="metadata-card-views-uploadDate">
					<p className="metadata-card-p">
						Total Views: {formatViews(meta.views)}
					</p>
					<p className="metadata-card-p">
						Uploaded: {formatDate(meta.uploadDate)}
					</p>
					<p className="metadata-card-p">
						Duration: {formatDuration(meta.duration)}
					</p>
				</div>
				<div></div>
			</div>
		</div>
	);
};
