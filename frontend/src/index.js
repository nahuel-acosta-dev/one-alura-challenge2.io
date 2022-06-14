import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './app.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from "./store/store";
import {Provider} from "react-redux";

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
    <React.StrictMode> {/*quitar modo estricto si hay exceso de renderizado*/}
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);