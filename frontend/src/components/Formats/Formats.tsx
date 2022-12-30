import * as React from 'react';
import { FormatCard } from '../FormatCard';
import { IParsedMetadata } from '../../types/responses';

interface IMetadataProp {
	meta: IParsedMetadata;
	url: string;
}

export const Formats = ({ meta, url }: IMetadataProp) => {
	if (Object.keys(meta).length === 0) return <div></div>;

	return (
		<div>
			<h2>Formats</h2>
			<div className="FormatCards-parent">
				{meta.formats.map((format) => (
					<FormatCard
						format={format}
						title={meta.title}
						url={url}
						key={`${format.format_id}`}
					/>
				))}
			</div>
		</div>
	);
};
