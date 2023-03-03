// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import * as React from 'react';

import './Spinner.css';

interface ISpinnerName {
	spinnerName: string;
}

export const Spinner = ({ spinnerName }: ISpinnerName) => {
	return <span className={spinnerName}></span>;
};
