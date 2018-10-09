import React, { Component } from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reduceFooter from './components/footer/reduceFooter';
import FooterTest from "./components/footer/FooterTest";

const store = createStore(reduceFooter);

class App extends Component {
  render() {
    return (
        <div>
            <Provider store={store}>
                <Footer />
            </Provider>
            <Provider store={store}>
                <FooterTest />
            </Provider>
        </div>
    );
  }
}

export default App;
