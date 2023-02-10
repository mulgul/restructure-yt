import * as React from 'react';
import './Title.css';

interface TitleProp {
	title: string;
	subtitle: string;
}

export const Title = ({ title, subtitle }: TitleProp) => {
	return (
		<div className="title-container">
			<h1 className="title-text">{title}</h1>
			<h2 className="subtitle-text">{subtitle}</h2>
		</div>
	);
};
