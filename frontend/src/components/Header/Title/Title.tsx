// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import * as React from 'react';

import './Title.css';

interface TitleProp {
	title: string;
	subtitle: string;
}

export const Title = ({ title, subtitle }: TitleProp) => {
	return (
		<div className="title-container">
			<h1 className="title-text">
				<img src="favicon.png" alt="" className="title-img" />
				{title}
			</h1>
			<h2 className="subtitle-text">{subtitle}</h2>
		</div>
	);
};
