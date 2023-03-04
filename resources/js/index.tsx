import axios from "axios";
import React from "react";
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Default Axios Properties
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'Application/json';
// axios.defaults.headers.common['Accept-Language'] = 'hi';

const domNode: HTMLElement = document.getElementById('root')!;
createRoot( domNode ).render( 
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
