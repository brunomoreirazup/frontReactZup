/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../navbar/Navbar';
import Dashboard from '../dashboard/DashBoard';
import HttpApi from '../http/HttpApi';
import AutoComplete from '../form/autoComplete/AutoComplete';
import CommonServices, { setListType, setFunction, setStore } from '../../CommonServices/CommonServices';

export default class Customers extends Component {
  static reloadNewLista(lista) {
    let count = 0;
    const newLista = [];
    if (!lista._embedded.customers.length) {
      CommonServices.reloadList(newLista);
      CommonServices.removePageInfo();
    }
    lista._embedded.customers
      .forEach((customers, i) => {
        const customerId = customers._links.self.href;
        const customerName = customers.name;
        let cityId;
        let cityName;
        return HttpApi.makeGetRequest(customers._links.city.href)
          .then((city) => {
            count += 1;
            cityId = city._links.self.href;
            cityName = city.name;
            newLista[i] = { id: customerId, cityId, data: [customerName, cityName] };
            if (count === lista._embedded.customers.length) {
              CommonServices.reloadList(newLista);
            }
          });
      });
  }

  static listCustomers() {
    CommonServices.list('customers')
      .then((lista) => {
        Customers.reloadNewLista(lista);
      });
  }

  static deleteCustomer(id) {
    CommonServices.sendData(id, 'DELETE');
  }

  static loadCity(value, cb) {
    if (!value) {
      return cb([]);
    }
    const url = `https://customers-challenge.herokuapp.com/cities/search/findByNameIgnoreCaseContaining?name=${value}`;
    return HttpApi.makeGetRequest(url)
      .then((lista) => {
        const newLista = lista._embedded.cities.map((city) => {
          const cityName = city.name;
          const id = city._links.self.href;
          return { name: cityName, id };
        });
        return cb(newLista);
      });
  }

  constructor(props) {
    super(props);
    const { route } = this.props;
    this.title = 'Clientes';
    this.tHead = [
      { text: 'Nome', className: 'sortHead customer' },
      { text: 'Cidade', className: 'customer' },
      { text: 'Editar', className: 'headerCommon' },
      { text: 'Remover', className: 'headerCommon' }];
    this.form = this.CreateFormBody.bind(this);
    this.input_customer_name = '';
    this.customer_name = '';
    setListType('list');
    setFunction(Customers.listCustomers, this.searchCustomer.bind(this));
    setStore(route.store);
    this.addCustomer = this.addCustomer.bind(this);
    this.editCustomer = this.editCustomer.bind(this);
    this.searchCustomer = this.searchCustomer.bind(this);
    CommonServices.callTable = CommonServices.callTable.bind(this);
  }


  componentDidMount() {
    CommonServices.callTable();
  }

  validateCityInput() {
    const { route } = this.props;
    const checkStatus = route.store.getState().reduceAutoComplete.autoCompleteState.ok;
    if (!checkStatus) {
      CommonServices.callAlertModal('blank', 'CHANGE_MODAL_CONTENT', 2000);
    }
    return checkStatus;
  }

  loadPayloadCustomer() {
    const { route } = this.props;
    return {
      name: this.input_customer_name.value,
      city: route.store.getState().reduceAutoComplete.autoCompleteState.menu[0].id,
    };
  }

  addCustomer() {
    const url = 'https://customers-challenge.herokuapp.com/customers';
    const method = 'POST';
    if (!CommonServices.validateFields(this.input_customer_name) && this.validateCityInput()) {
      CommonServices.sendData(url, method, this.loadPayloadCustomer());
    }
  }

  editCustomer(id) {
    const method = 'PATCH';
    if (!CommonServices.validateFields(this.input_customer_name) && this.validateCityInput()) {
      CommonServices.sendData(id, method, this.loadPayloadCustomer());
    }
  }

  searchCustomer(name) {
    const { route } = this.props;
    route.store.dispatch({ type: 'LOADING', showLoading: true });

    if (!CommonServices.emptySearch(name)) {
      HttpApi.makeGetRequest(`https://customers-challenge.herokuapp.com/customers/search/findByNameIgnoreCaseContaining?name=${name}`)
        .then((lista) => {
          if (lista.status >= 400) {
            throw new Error('status >= 400');
          }
          CommonServices.storeSizeSearch(lista._embedded.customers);
          CommonServices.removePageInfo();
          Customers.reloadNewLista(lista);
          CommonServices.removePageInfo();
        })
        .catch(() => {
          CommonServices.storeSizeSearch([]);
          CommonServices.reloadList([]);
          CommonServices.removePageInfo();
        });
    }
  }

  CreateFormBody(action, id) {
    if (id !== undefined) {
      this.loadForm(id);
    } else {
      this.customer_name = '';
      const { route } = this.props;
      route.store.dispatch({
        type: 'AUTO_COMPLETE_STATE',
        autoCompleteState: {
          value: '',
          menu: [],
          ok: false,
          loading: false,
        },
      });
      route.store.dispatch({ type: 'AUTOCOMPLETE', customerCity: '' });
    }

    return (
      <form className="form-group" onSubmit={(event) => { event.preventDefault(); action(id); }}>
        <label htmlFor="input_customer_name">
          Cliente:
          <input
            autoComplete="off"
            id="input_customer_name"
            className="form-control"
            defaultValue={this.customer_name}
            type="text"
            placeholder="Insira um cliente"
            ref={(input) => { this.input_customer_name = input; return null; }}
          />
        </label>
        <p>Cidade:</p>
        <AutoComplete search={Customers.loadCity} />
      </form>
    );
  }

  loadForm(id) {
    let customerCity = '';
    let cityId;
    const { route } = this.props;
    const state = route.store.getState();
    state.reduceTable.table_body.forEach((element) => {
      if (element.id === id) {
        [this.customer_name, customerCity] = element.data;
        [cityId] = [element.cityId];
      }
      route.store.dispatch({
        type: 'AUTO_COMPLETE_STATE',
        autoCompleteState: {
          value: customerCity,
          menu: [{ name: customerCity, id: cityId }],
          ok: true,
          loading: false,
        },
      });
    });
  }

  render() {
    return (
      <div>
        <Navbar currentPage={1} />

        <Dashboard
          title={this.title}
          tHead={this.tHead}
          form={this.form}
          add={this.addCustomer}
          edit={this.editCustomer}
          delete={Customers.deleteCustomer}
          search={this.searchCustomer}
          list={CommonServices.callTable}
        />
      </div>

    );
  }
}

Customers.propTypes = {
  route: PropTypes.shape({
    component: PropTypes.func,
    path: PropTypes.string,
    store: PropTypes.shape({
      dispatch: PropTypes.func,
      getState: PropTypes.func,
      liftedStore: PropTypes.objectOf(PropTypes.func),
      replaceReducer: PropTypes.func,
      subscribe: PropTypes.func,
      Symbol: PropTypes.func,
    }),
  }).isRequired,
};