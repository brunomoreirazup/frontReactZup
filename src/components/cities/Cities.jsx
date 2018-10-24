/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../navbar/Navbar';
import Dashboard from '../dashboard/DashBoard';
import HttpApi from '../http/HttpApi';
import CommonServices, { setFunction, setListType, setStore } from '../../CommonServices/CommonServices';


export default class Cities extends Component {
  static deleteCity(id) {
    CommonServices.sendData(id, 'DELETE');
  }

  static createNewLista(lista) {
    const newLista = lista._embedded.cities.map((city) => {
      const cityId = city._links.self.href;
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
    const url = 'https://customers-challenge.herokuapp.com/cities';
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
      HttpApi.makeGetRequest(`https://customers-challenge.herokuapp.com/cities/search/findByNameIgnoreCaseContaining?name=${name}`)
        .then((lista) => {
          if (lista.status >= 400) {
            throw new Error('status >= 400');
          }
          CommonServices.storeSizeSearch(lista._embedded.cities);
          CommonServices.reloadList(Cities.createNewLista(lista));
          CommonServices.removePageInfo();
        })
        .catch((error) => {
          console.log(error);
          CommonServices.storeSizeSearch([]);
          CommonServices.reloadList([]);
          CommonServices.removePageInfo();
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
