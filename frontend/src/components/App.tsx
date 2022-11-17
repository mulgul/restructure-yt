import React from "react";
import Header from "./Header/index"
import URLInput from "./URLInput/index"

type AppProps = { num: number };

// interface AppProps {
//     num: number;
// }

export const App = ({num}: AppProps) => {
    return(
        <div>
            <Header />
            <URLInput />
            VideoData
            Formats
            Footer - Donate

            <h1>Total Number: {num}</h1>
        </div>
    )
}