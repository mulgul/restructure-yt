// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import * as React from 'react';

import { FormatCard } from '../FormatCard';
import { IFormat, IParsedMetadata } from '../../types/responses';
import './Formats.css';

interface IMetadataProp {
	meta: IParsedMetadata;
	url: string;
}

export const Formats = ({ meta, url }: IMetadataProp) => {
	if (Object.keys(meta).length === 0) return <div></div>;

	const filterFormats = (formats: IFormat[]) => {
		const sortedChars = formats.sort((a: IFormat, b: IFormat) =>
			a.ext.localeCompare(b.ext)
		);
		let i = 0;
		let j = 1;
		let hightestIndex = 0;
		const finalFormats = [];
		while (j < sortedChars.length) {
			if (j === sortedChars.length - 1) {
				if (sortedChars[i].filesize > sortedChars[j].filesize) {
					hightestIndex = i;
				} else {
					hightestIndex = j;
				}
				finalFormats.push(sortedChars[hightestIndex]);
			} else if (sortedChars[i].ext === sortedChars[j].ext) {
				if (sortedChars[i].filesize > sortedChars[j].filesize) {
					hightestIndex = i;
				} else {
					hightestIndex = j;
				}
			} else {
				finalFormats.push(sortedChars[hightestIndex]);
			}
			j += 1;
			i += 1;
		}
		return finalFormats;
	};

	return (
		<div className="formats-container">
			<div className="formats-title">
				<h2>Downloadable Formats</h2>
			</div>
			<div className="format-cards-parent">
				{filterFormats(meta.formats).map((format) => (
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
