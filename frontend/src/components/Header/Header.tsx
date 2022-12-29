import * as React from 'react';
import { Title } from './Title';
import './Header.css';

export const Header = () => {
	return (
		<div className="header-container">
			<Title title={'Youtube Audio Downloader'}></Title>
		</div>
	);
};
