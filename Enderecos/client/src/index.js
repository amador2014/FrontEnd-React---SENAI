import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/Home/App.js';

import * as serviceWorker from './serviceWorker';

import './styles/index.css';

//importando meu app
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
