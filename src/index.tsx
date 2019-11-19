import React from 'react';
import ReactDOM from 'react-dom';
import './pages/index.scss';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import Router from '../src/pages/router'
ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
