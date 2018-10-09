import "bootstrap/dist/css/bootstrap.min.css";
import './css/header.css';
import './css/navbar.css';
import React, { Component } from 'react';
import home from './components/home/Home';
import {Router, Route, browserHistory} from 'react-router';

class App extends Component {
    render() {
        return (
            <body>
            <div className="App">
                <Router history={browserHistory}>
                    <Route path="/" component={home}/>
                    {/*<Route path="/cidades" component={cities}/>*/}
                    {/*<Route path="/clientes" component={customers}/>*/}
                </Router>
            </div>
            </body>
        )
    }
}
export default App;