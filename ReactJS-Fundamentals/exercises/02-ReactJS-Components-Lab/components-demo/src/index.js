import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Parent from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Parent/>, document.getElementById('root'));
registerServiceWorker();
