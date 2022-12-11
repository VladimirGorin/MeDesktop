// eslint-disable-line
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './theme/init.css';
import { Main } from './components/Main';
ReactDOM.render(<Main />, document.getElementById('root'));
