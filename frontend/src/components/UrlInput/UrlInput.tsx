// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import * as React from 'react';
import { useState } from 'react';

import { fetchAudioMetadata } from '../../calls/audioMetadata';
import { IParsedMetadata } from '../../types/responses';
import { Formats } from '../Formats';
import { MetaDataCard } from '../MetadataCard/MetadataCard';
import { Spinner } from './Spinner';
import './UrlInput.css';

export const UrlInput = () => {
	const [url, setUrl] = useState<string>();
	const [meta, setMeta] = useState<IParsedMetadata | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const validateYoutubeUrl = (val: string) => {
		return val.match(
			//eslint-disable-next-line
			/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
		);
	};

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		const URLFormValue = document
			.getElementsByClassName('url-form')[0]
			.getAttribute('value');
		// TODO: card template for when the formats is loading.
		if (validateYoutubeUrl(URLFormValue)) {
			setIsLoading(true);
			const data = await fetchAudioMetadata(encodeURIComponent(url));
			setIsLoading(false);
			setMeta(data);
		}
	};

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);

		const URLFormInput = document.getElementsByClassName('url-form')[0];
		if (validateYoutubeUrl(e.target.value)) {
			URLFormInput?.classList.remove('bad-link');
			URLFormInput?.classList.add('good-link');
		} else {
			URLFormInput?.classList.remove('good-link');
			URLFormInput?.classList.add('bad-link');
		}
	};

	return (
		<div className="url-container">
			<div className="url-wrapper">
				<input
					className="url-form"
					type="url"
					value={url}
					placeholder="Enter a URL to see available formats"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
				/>
				<button className="url-button" onClick={(e) => handleSubmit(e)}>
					{isLoading ? <Spinner spinnerName={'loader-white'} /> : 'Search'}
				</button>
			</div>
			{meta && !isLoading ? (
				<div>
					<MetaDataCard meta={meta} />
					<Formats meta={meta} url={url} />
				</div>
			) : (
				<div />
			)}
		</div>
	);
};
