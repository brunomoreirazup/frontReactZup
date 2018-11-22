/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../navbar/Navbar';
import Dashboard from '../../dashboard/DashBoard';
import HttpServices from '../../../Helpers/HttpServices/HttpServices';
import CommonServices, {
  setFunction, setListType, setStore, urlApi,
} from '../../../Helpers/CommonServices/CommonServices';


export default class Cities extends Component {
  static deleteCity(id) {
    CommonServices.sendData(id, 'DELETE');
  }

  static createNewLista(lista) {
    const newLista = lista._embedded.cities.map((city) => {
      const cityId = `${urlApi}/cities/${city.id}`;
      const cityName = city.name;
      return { id: cityId, data: [cityName] };
    });
    return newLista;
  }

  static listCity() {
    CommonServices.list('cities')
      .then((lista) => {
        CommonServices.reloadList(Cities.createNewLista(lista));
      });
  }

  constructor(props) {
    super(props);
    const { route } = this.props;
    this.title = 'Cidades';
    this.tHead = [
      { text: 'Nome', className: 'city sortHead' },
      { text: 'Editar', className: 'headerCommon' },
      { text: 'Remover', className: 'headerCommon' }];
    this.form = this.createFormBody.bind(this);
    this.input_cidade_name = '';
    this.cidade_name = '';
    setListType('list');
    setFunction(Cities.listCity, this.searchCity.bind(this));
    setStore(route.store);
    this.addCity = this.addCity.bind(this);
    this.editCity = this.editCity.bind(this);
    this.searchCity = this.searchCity.bind(this);
    this.loadMsgDelete = this.loadMsgDelete.bind(this);
    CommonServices.callTable = CommonServices.callTable.bind(this);
  }

  componentDidMount() {
    CommonServices.callTable();
  }

  loadPayloadCity() {
    const payload = {
      name: this.input_cidade_name.value,
    };
    return payload;
  }

  addCity() {
    const url = `${urlApi}/cities`;
    const method = 'POST';

    if (!CommonServices.validateFields(this.input_cidade_name)) {
      CommonServices.sendData(url, method, this.loadPayloadCity());
    }
  }

  editCity(id) {
    const url = id;
    const method = 'PUT';

    if (!CommonServices.validateFields(this.input_cidade_name)) {
      CommonServices.sendData(url, method, this.loadPayloadCity());
    }
  }

  searchCity(name) {
    const { route } = this.props;
    route.store.dispatch({ type: 'LOADING', showLoading: true });

    if (!CommonServices.emptySearch(name)) {
      setListType('search');
      HttpServices.makeGetRequest(`${urlApi}/cities/search/findByNameIgnoreCaseContaining?name=${name}&${CommonServices.mountUrl()}`)
        .then((lista) => {
          if (lista._embedded.cities.length === 0) {
            throw new Error('status >= 400');
          }
          CommonServices.storeSizePages(lista);
          CommonServices.changeStorePages(lista);
          CommonServices.reloadList(Cities.createNewLista(lista));
        })
        .catch((error) => {
          const pageEmptyJson = {
            page: {
              number: 0,
              size: 5,
              totalPages: 1,
              totalElements: 0,
            },
          };
          console.log(error);
          CommonServices.storeSizeSearch([]);
          CommonServices.changeStorePages(pageEmptyJson);
          CommonServices.reloadList([]);
        });
    }
  }

  createFormBody(action, id) {
    if (id !== undefined) {
      this.loadForm(id);
    } else {
      this.cidade_name = '';
    }
    return (
      <form onSubmit={(event) => { event.preventDefault(); action(id); }}>
        <label htmlFor="input_cidade_name">
          Cidade:
          <input autoComplete="off" id="input_cidade_name" className="form-control" defaultValue={this.cidade_name} type="text" placeholder="Insira uma cidade" ref={(input) => { this.input_cidade_name = input; }} />
        </label>
      </form>
    );
  }

  loadForm(id) {
    const { route } = this.props;
    let city = '';
    const state = route.store.getState();
    state.reduceTable.table_body.forEach((element) => {
      if (element.id === id) {
        [city] = [element.data[0]];
      }
    });
    this.cidade_name = city;
  }

  loadMsgDelete(id, callBack) {
    let realId = '';
    for (let i = id.length - 1; i >= 0; i -= 1) {
      if (id.charAt(i) !== '/') realId = id.charAt(i) + realId;
      else break;
    }
    HttpServices.makeGetRequest(`${urlApi}/customers/search/city/${realId}?page=0&size=20&sort=name,asc`)
      .then((lista) => {
        console.log(lista);
        if (lista._embedded.customers.length === 0) {
          callBack('Realmente quer deleter essa City ? ');
          return;
        }
        let msg = 'Caso você deletar está Cidade os seguintes clientes vão ser deletado:';
        lista._embedded.customers.forEach((customer,index) => msg += index === 0 ? `${customer.name}` : `, ${customer.name}`);
        console.log(msg);
        callBack(msg);
      });
  }

  render() {
    return (
      <div>
        <Navbar currentPage={0} />

        <Dashboard
          title={this.title}
          tHead={this.tHead}
          form={this.form}
          add={this.addCity}
          edit={this.editCity}
          delete={Cities.deleteCity}
          search={this.searchCity}
          list={CommonServices.callTable}
          loadMsgDelete={this.loadMsgDelete}
        />
      </div>

    );
  }
}

Cities.propTypes = {
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
