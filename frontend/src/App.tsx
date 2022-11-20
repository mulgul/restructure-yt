import React from "react";
import Header from "./components/Header/index";
import URLInput from "./components/URLInput/index";
import './App.css'


// type AppProps = { num: number };

// interface AppProps {
//     num: number;
// }
const handleEvent = () => {
    console.log("it works")
}

const App = () => {
    return(
        <div className="App-parent">
            <div className="App-container">
                <Header />
                <URLInput />
                {/* <div className="Footer-container">

                    Footer - Donate
                </div> */}
            </div>
        </div>
    )
}

export default App;