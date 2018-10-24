/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import home from './components/home/Home';
import cities from './components/cities/Cities';
import customers from './components/customers/Customers';
import reduceFooter from './components/footer/reduceFooter';
import reduceMainModal from './components/modal/reduceMainModal';
import reduceLoading from './components/modal/reduceLoading';
import reduceContentInfo from './components/header/contentInfo/reduceContentInfo';
import reduceSearch from './components/header/searchBox/reduceSearch';
import reduceTable from './components/table/reduceTable';
import reduceAutoComplete from './components/form/autoComplete/reduceAutoComplete';
import Copyright from './components/copyright/Copyright';


const reducers = combineReducers({
  reduceSearch,
  reduceFooter,
  reduceTable,
  reduceMainModal,
  reduceContentInfo,
  reduceAutoComplete,
  reduceLoading,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export { store };
function App() {
  return (
    <div className="Site">
      <div className="Site-content">
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/" component={home} />
            <Route path="/cidades" component={cities} store={store} />
            <Route path="/clientes" component={customers} store={store} />
          </Router>
        </Provider>
      </div>
      <Copyright />
    </div>
  );
}
export default App;
