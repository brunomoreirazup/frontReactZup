/* global document */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import './components/header/header.css';
import './components/navbar/navbar.css';
import './components/footer/footer.css';
import './components/copyright/copyright.css';
import './components/table/table.css';
import './components/modal/modal.css';
import './app.css';
import './components/modal/form/autoComplete/AutoComplete.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(

  <App />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.

serviceWorker.unregister();
