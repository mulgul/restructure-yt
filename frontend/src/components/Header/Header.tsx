import * as React from 'react';
import { Title } from './Title';
import './Header.css';

export const Header = () => {
	return (
		<div className="header-container">
			<Title
				title={'Restructure'}
				subtitle={'Youtube to audio file converter'}
			></Title>
		</div>
	);
};
