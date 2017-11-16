import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {ReactBrowser} from 'react-router-dom';
import {Provider} from 'react-redux';



ReactDOM.render(
    <Provider store={}>
        <ReactBrowser>
            <App/>
        </ReactBrowser>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
