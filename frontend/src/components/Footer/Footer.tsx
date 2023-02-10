import * as React from 'react';
import './Footer.css';

export const Footer = () => {
	return (
		<div className="footer-container">
			<p className="footer-attribute">
				Image by{' '}
				<a
					className="footer-attribute-link"
					href="https://www.freepik.com/free-vector/minimal-geometric-landing-page_5934183.htm#query=landing%20page%20background&position=26&from_view=keyword"
				>
					Freepik
				</a>
			</p>
			{/* <div>Footer</div> */}
			{/* <p className='footer-attribute' >Photo by <a className='footer-attribute-link' href="https://unsplash.com/es/@simonppt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">SIMON LEE</a> on <a className='footer-attribute-link' href="https://unsplash.com/photos/zft-W1kVEhg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p> */}
		</div>
	);
};
