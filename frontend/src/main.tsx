import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
// import './reset.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store.js';

// const App = () => {
//     return(
//         <div>
//             <h1>Hello!</h1>
//             <h2>It worked!!</h2>
//         </div>
//     )
// }
let store = configureStore({});

function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App num={12345} />
            </BrowserRouter>
        </Provider>
    )
}

// ReactDOM.render(
//     <App num={12345} />, 
//     document.getElementById("root")
// );
ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
);