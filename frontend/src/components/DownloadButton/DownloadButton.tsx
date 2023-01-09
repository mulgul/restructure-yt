import * as React from 'react';
import './DownloadButton.css';

export enum ButtonState {
	Primary = 'Primary',
	Loading = 'Loading',
}

interface IButtonProps {
	readonly buttonState: ButtonState;
	readonly onClick: () => void;
	readonly label: string;
}

export const DownloadButton: React.FC<IButtonProps> = ({
	buttonState,
	onClick,
	label,
}) => {
	const isLoading = buttonState === ButtonState.Loading;
	return (
		<div className="button-container">
			<button onClick={onClick} className="button-primary">
				{isLoading && 'isLoading'}
				{isLoading && label}
			</button>
		</div>
	);
};
