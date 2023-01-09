import * as React from 'react';
import { FormatCard } from '../FormatCard';
import { IParsedMetadata } from '../../types/responses';
import './Formats.css';

interface IMetadataProp {
	meta: IParsedMetadata;
}

export const Formats = ({ meta }: IMetadataProp) => {
	if (Object.keys(meta).length === 0) return <div></div>;

	return (
		<div className="formats-container">
			<h2>Formats</h2>
			<div className="format-cards-parent">
				{meta.formats.map((format) => (
					<FormatCard format={format} key={`${format.format_id}`} />
				))}
			</div>
		</div>
	);
};
