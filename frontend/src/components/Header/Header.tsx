// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import * as React from 'react';

import { Title } from './Title';
import './Header.css';

export const Header = () => {
	return (
		<div className="header-container">
			<Title
				title={'estructure'}
				subtitle={'Youtube to audio file downloader'}
			></Title>
		</div>
	);
};
