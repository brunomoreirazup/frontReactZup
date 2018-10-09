import React, { Component } from 'react';
import home from './components/home/Home';
import {Router, Route, browserHistory} from 'react-router';
import cities from "./components/cities/Cities";
import customers from "./components/customers/Customers";
import {createStore,combineReducers} from "redux";
import reduceFooter from "./components/footer/reduceFooter";
import reduceTable from "./components/table/reduceTable";
import {Provider} from 'react-redux';

const reducers = combineReducers({reduceFooter,reduceTable});

const store = createStore(reduceFooter);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={home}/>
                    <Route path="/cidades" component={cities} />
                    <Route path="/clientes" component={customers}/>
                </Router>
            </Provider>
        )
    }
}
export default App;