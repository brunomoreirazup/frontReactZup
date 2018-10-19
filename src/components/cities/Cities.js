import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import HttpApi from "../http/HttpApi";
import CommonServices, { setFunction, setListType } from "../../CommonServices/CommonServices";



export default class Cities extends Component {

    constructor(props) {
        super(props);
        this.title = "Cidades";
        this.tHead = [
            { text: "Nome", className: 'city sortHead' },
            { text: "Editar", className: 'headerCommon' },
            { text: "Remover", className: 'headerCommon' }];
        this.form = this.CreateFormBody.bind(this);
        this.input_cidade_name = "";
        this.cidade_name = "";
        setListType("list");
        setFunction(this.listCity.bind(this), this.searchCity.bind(this));
    }

    componentDidMount() {
        CommonServices.callTable();
    }

    render() {
        return (
            <div>
                <Navbar currentPage={0} />

                <Dashboard
                    title={this.title}
                    tHead={this.tHead}
                    form={this.form}
                    add={this.addCity.bind(this)}
                    edit={this.editCity.bind(this)}
                    delete={this.deleteCity.bind(this)}
                    search={this.searchCity.bind(this)}
                    list={CommonServices.callTable.bind(this)}
                />
            </div>

        )
    }

    loadPayloadCity() {

        let payload = {
            "name": this.input_cidade_name.value
        };

        return payload;
    }

    addCity() {

        let url = 'https://customers-challenge.herokuapp.com/cities';
        let method = 'POST';

        if (!CommonServices.validateFields(this.input_cidade_name)) {
            CommonServices.sendData(url, method, this.loadPayloadCity());
        }
    }

    editCity(id) {

        let url = id;
        let method = 'PUT';

        if (!CommonServices.validateFields(this.input_cidade_name)) {
            CommonServices.sendData(url, method, this.loadPayloadCity());
        }
    }


    deleteCity(id) {
        CommonServices.sendData(id,"DELETE");
    }


    searchCity(name) {
        this.props.route.store.dispatch({ type: 'LOADING', showLoading: true });

        if (!CommonServices.emptySearch(name)) {
            HttpApi.makeGetRequest(`https://customers-challenge.herokuapp.com/cities/search/findByNameIgnoreCaseContaining?name=${name}`)
                .then(lista => {
                    CommonServices.storeSizeSearch(lista._embedded.cities);
                    let newLista = lista._embedded.cities.map(city => {
                        let cityId = city._links.self.href;
                        let cityName = city.name;
                        return { id: cityId, data: [cityName] };
                    });
                    CommonServices.removePageInfo(newLista);
                });
        }
    }


    listCity() {
        CommonServices.list("cities")
            .then(lista => {
                let newLista = lista._embedded.cities.map(city => {
                    let cityId = city._links.self.href;
                    let cityName = city.name;
                    return { id: cityId, data: [cityName] };
                }
                );
                CommonServices.reloadList(newLista);
            });
    }

    CreateFormBody(action, id) {
        if (id !== undefined)
            this.loadForm(id);
        else
            this.cidade_name = "";
        return (
            <form onSubmit={(event) => { event.preventDefault(); action(id) }}>
                <label>Cidade:</label>
                <input id="input_cidade_name" className="form-control" defaultValue={this.cidade_name} type="text" placeholder="Insira uma cidade" ref={(input) => this.input_cidade_name = input} />
            </form>
        );
    }

    loadForm(id) {
        let city = "";
        let state = this.props.route.store.getState();
        state.reduceTable.table_body.forEach(element => {
            if (element.id === id)
                city = element.data[0];
        });
        this.cidade_name = city;
    }

}