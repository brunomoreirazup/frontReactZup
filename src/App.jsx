/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import home from './Components/pages/home/Home';
import cities from './Components/pages/cities/Cities';
import customers from './Components/pages/customers/Customers';
import reduceFooter from './Components/footer/reduceFooter';
import reduceMainModal from './Components/modal/reduceMainModal';
import reduceLoading from './Components/table/loading/reduceLoading';
import reduceContentInfo from './Components/header/contentInfo/reduceContentInfo';
import reduceSearch from './Components/header/searchBox/reduceSearch';
import reduceTable from './Components/table/reduceTable';
import reduceAutoComplete from './Components/modal/form/autoComplete/reduceAutoComplete';
import Copyright from './Components/copyright/Copyright';

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
  composeWithDevTools(),
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
