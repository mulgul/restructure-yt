import * as React from 'react';
import { useState } from 'react';
import { fetchAudioMetadata } from '../../calls/audioMetadata';
import { IParsedMetadata } from '../../types/responses';
import './UrlInput.css';

export const UrlInput = () => {
	const [url, setUrl] = useState<string>();
	const [meta, setMeta] = useState<IParsedMetadata | undefined>();
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

		// Set background loader

		const data = await fetchAudioMetadata(encodeURIComponent(url));
		setMeta(data);

		// Formats should load below. Perhaps filled in grey bits.
	};

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);

		const URLFormInput = document.getElementById('url-form');
		if (validateYoutubeUrl(e.target.value)) {
			URLFormInput?.classList.remove('bad-link');
			URLFormInput?.classList.add('good-link');
		} else {
			URLFormInput?.classList.remove('good-link');
			URLFormInput?.classList.add('bad-link');
		}
	};

	return (
		<div className="url-wrapper">
			<input
				id="url-form"
				type="url"
				value={url}
				placeholder="Enter a URL for available formats"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
			/>
			<button className="url-button" onClick={(e) => handleSubmit(e)}>
				Search
			</button>
		</div>
	);
};
