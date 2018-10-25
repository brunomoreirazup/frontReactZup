/* global document */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import './Components/header/header.css';
import './Components/navbar/navbar.css';
import './Components/footer/footer.css';
import './Components/copyright/copyright.css';
import './Components/table/table.css';
import './Components/modal/modal.css';
import './app.css';
import './Components/modal/form/autoComplete/AutoComplete.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(

  <App />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.

serviceWorker.unregister();
