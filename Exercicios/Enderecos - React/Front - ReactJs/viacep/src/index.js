import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App.js';
import * as serviceWorker from './serviceWorker';

//importando meu app
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
