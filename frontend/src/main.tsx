import React from 'react';
import ReactDOM from 'react-dom';
import { App }  from './components/App';
import './reset.css';

// const App = () => {
//     return(
//         <div>
//             <h1>Hello!</h1>
//             <h2>It worked!!</h2>
//         </div>
//     )
// }

ReactDOM.render(
    <App num={12345} />, 
    document.getElementById("root")
);
