import * as React from 'react';
import './Spinner.css';

interface ISpinnerName {
	spinnerName: string;
}

export const Spinner = ({ spinnerName }: ISpinnerName) => {
	return <span className={spinnerName}></span>;
};
