import * as React from 'react';

interface TitleProp {
	title: string;
}

const Title = ({ title }: TitleProp) => {
	return (
		<div className="title-container">
			<h1>{title}</h1>
		</div>
	);
};

export default Title;
