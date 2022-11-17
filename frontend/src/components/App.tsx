import React from "react";

type AppProps = { num: number };

// interface AppProps {
//     num: number;
// }

export const App = ({num}: AppProps) => <h1>Total Number: {num}</h1>;