/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../navbar/Navbar';
import Dashboard from '../../dashboard/DashBoard';
import HttpServices from '../../../Helpers/HttpServices/HttpServices';
import AutoComplete from '../../modal/form/autoComplete/AutoComplete';
import CommonServices, {
  setListType, setFunction, setStore, urlApi,
} from '../../../Helpers/CommonServices/CommonServices';

export default class Customers extends Component {
  static reloadNewLista(lista) {
    const newLista = [];
    if (!lista._embedded.customers.length) {
      CommonServices.reloadList(newLista);
      CommonServices.removePageInfo();
    }
    lista._embedded.customers
      .forEach((customers, i) => {
        const customerId = `${urlApi}/customers/${customers.id}`;
        const customerName = customers.name;
        const cityId = customers.city.id;
        const cityName = customers.city.name;
        newLista[i] = { id: customerId, cityId, data: [customerName, cityName] };
      });
    CommonServices.reloadList(newLista);
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
    const url = `${urlApi}/cities/search/findByNameIgnoreCaseContaining?name=${value}`;
    return HttpServices.makeGetRequest(url)
      .then((lista) => {
        const newLista = lista._embedded.cities.map((city) => {
          const cityName = city.name;
          const cityId = city.id;
          return { name: cityName, id: cityId };
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
    this.loadMsgDelete = this.loadMsgDelete.bind(this);
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
      city: { id: route.store.getState().reduceAutoComplete.autoCompleteState.menu[0].id },
    };
  }

  addCustomer() {
    const url = `${urlApi}/customers`;
    const method = 'POST';
    if (!CommonServices.validateFields(this.input_customer_name) && this.validateCityInput()) {
      CommonServices.sendData(url, method, this.loadPayloadCustomer());
    }
  }

  editCustomer(id) {
    const method = 'PUT';
    if (!CommonServices.validateFields(this.input_customer_name) && this.validateCityInput()) {
      CommonServices.sendData(id, method, this.loadPayloadCustomer());
    }
  }

  searchCustomer(name) {
    const { route } = this.props;
    route.store.dispatch({ type: 'LOADING', showLoading: true });

    if (!CommonServices.emptySearch(name)) {
      setListType('search');
      HttpServices.makeGetRequest(`${urlApi}/customers/search/findByNameIgnoreCaseContaining?name=${name}&${CommonServices.mountUrl()}`)
        .then((lista) => {
          if (lista._embedded.customers.length === 0) {
            throw new Error('status >= 400');
          }
          CommonServices.storeSizePages(lista);
          Customers.reloadNewLista(lista);
          CommonServices.changeStorePages(lista);
        })
        .catch(() => {
          const pageEmptyJson = {
            page: {
              number: 0,
              size: 5,
              totalPages: 1,
              totalElements: 0,
            },
          };
          CommonServices.storeSizeSearch([]);
          CommonServices.changeStorePages(pageEmptyJson);
          CommonServices.reloadList([]);
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
        <p className="modal-label">Cidade:</p>
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

  loadMsgDelete(id, callBack) {
    callBack('Você Realmente quer deletar este cliente ? ');
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
          loadMsgDelete={this.loadMsgDelete}
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
