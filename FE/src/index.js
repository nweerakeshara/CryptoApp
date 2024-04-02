//install packages then for this
//create 1st
//then app.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


ReactDOM.render(
    <Router>
        <App/>
    </Router>, document.getElementById('root'));