// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import * as React from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/Home';
import './App.css';

function App() {
	return (
		<div className="parent-wrapper">
			<Header />
			<HomePage />
		</div>
	);
}

export default App;
