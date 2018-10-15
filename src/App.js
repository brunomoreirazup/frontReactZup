import React, { Component } from 'react';
import home from './components/home/Home';
import {Router, Route, browserHistory} from 'react-router';
import cities from "./components/cities/Cities";
import customers from "./components/customers/Customers";
import {createStore} from "redux";
import reduceFooter from "./components/footer/reduceFooter";
import {Provider} from 'react-redux';
import Copyright from "./components/copyright/Copyright";
import devToolsEnhancer from 'remote-redux-devtools';
import reduceMainModal from "./components/modal/reduceMainModal";
import reduceContentInfo from "./components/header/contentInfo/reduceContentInfo";

const reducers = combineReducers({reduceFooter,reduceTable,reduceMainModal,reduceContentInfo});

const store = createStore(reducers,devToolsEnhancer());

class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <Router history={browserHistory}>
                        <Route path="/" component={home}/>
                        <Route path="/cidades" component={cities} store={store}/>
                        <Route path="/clientes" component={customers}/>
                    </Router>
                </Provider>
                <Copyright/>
            </div>
        )
    }
}
export default App;