import * as React from 'react';
import { FormatCard } from '../FormatCard';
import { IParsedMetadata } from '../../types/responses';
import './Formats.css';

interface IMetadataProp {
	meta: IParsedMetadata;
	url: string;
}

export const Formats = ({ meta, url }: IMetadataProp) => {
	if (Object.keys(meta).length === 0) return <div></div>;

	return (
		<div className="formats-container">
			<div className='formats-title'>
				<h2>Formats</h2>
			</div>
			<div className="format-cards-parent">
				{meta.formats.map((format) => (
					<FormatCard
						format={format}
						id={`${format.format_id}`}
						ext={format.ext}
						title={meta.title}
						url={url}
						key={format.format_id}
					/>
				))}
			</div>
		</div>
	);
};
