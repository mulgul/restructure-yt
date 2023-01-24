import * as React from 'react';
import './Title.css'

interface TitleProp {
	title: string;
}

export const Title = ({ title }: TitleProp) => {
	return (
		<div className="title-container">
			<h1 className='title-text'>{title}</h1>
		</div>
	);
};
