import '../style/App.css';
import AppBody from './AppBody.js'
import Copyright from "./Copyright";
import Box from "@material-ui/core/Box";
import React from "react";

export default function Home() {
    return (
        <div className="App">
            <main className="App-body">
                <AppBody />
            </main>
            <Box mt={0} id={'footer'}>
                <Copyright />
            </Box>
        </div>
    );
}
