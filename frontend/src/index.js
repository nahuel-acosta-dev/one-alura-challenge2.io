import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './app.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router} from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
    <Router>
        <App />
    </Router>
);