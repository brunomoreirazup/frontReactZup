import React, { Component } from 'react';
import home from './components/home/Home';
import './App.css';
import {Router, Route, browserHistory} from 'react-router';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={browserHistory}>
                    <Route path="/" component={home}/>
                    {/*<Route path="/cidades" component={cities}/>*/}
                    {/*<Route path="/clientes" component={customers}/>*/}
                </Router>
            </div>
        )
    }
}
export default App;