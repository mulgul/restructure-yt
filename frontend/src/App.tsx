import * as React from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/Home';
import { Footer } from './components/Footer';
import './App.css';

function App() {
	return (
		<div className="parent-wrapper">
			<Header />
			<HomePage />
			<Footer />
		</div>
	);
}

export default App;
