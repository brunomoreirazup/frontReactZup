import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "./css/header.css";
import "./css/navbar.css";
import "./css/footer.css";
import "./css/copyright.css";
import "./css/table.css"
import "./components/form/autoComplete/AutoComplete.css"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(

        <App />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.

serviceWorker.unregister();
