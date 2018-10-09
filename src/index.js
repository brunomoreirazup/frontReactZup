import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Provider from "react-redux/es/components/Provider";
import {createStore} from "redux";
import searchBoxReducer from './components/header/searchBox/searchBoxReducer';

const store = createStore(searchBoxReducer);

ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.

serviceWorker.unregister();
