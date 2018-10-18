import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import HttpApi from "../http/HttpApi";
import CommonServices from "../../CommonServices/CommonServices";

export default class Cities extends Component {

    constructor(props) {
        super(props);
        this.title = "Cidades";
        this.tHead = [
            {text:"Nome", className:'city sortHead'},
            {text:"Editar", className:'headerCommon'},
            {text:"Remover", className:'headerCommon'}];
        this.form = this.CreateFormBody.bind(this);
        this.input_cidade_name = "";
        this.cidade_name = "";
        this.listType = "list";
    }

    componentDidMount() {
        CommonServices.callTable(this.listCity.bind(this));
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
                    list={CommonServices.callTable}
                />
            </div>

        )
    }

    callAlertModal(showAlertType, actionType, time) {
        this.props.route.store.dispatch({ type: "CHANGE_MODAL_CONTENT", showAlert: showAlertType });
        setTimeout(() => this.props.route.store.dispatch({ type: actionType }), time);

    }
    
    addCity() {
        let url = 'https://customers-challenge.herokuapp.com/cities';
        let method = 'POST';

        if(!CommonServices.validateFields(this.input_cidade_name)) {

            let payload = {
                "name": this.input_cidade_name.value                
            };
            
            CommonServices.sendData(url,method,payload);
        }
    }

    editCity(id) {

        let url = id;
        let method = 'PUT';

        if (this.input_cidade_name.value === "") {
            CommonServices.callAlertModal("blank", "CHANGE_MODAL_CONTENT", 2000);
            this.input_cidade_name.focus();
        }

        else {
            let payload = {
                "name": this.input_cidade_name.value
            };

            HttpApi.makeChangeRequest(url, method, payload)
                .then(() => {
                    CommonServices.callTable(this.listCity.bind(this));
                    CommonServices.callAlertModal("success", "TOGGLE_MAIN_MODAL", 1000);
                })
                .catch(() => {
                    CommonServices.callAlertModal("fail", "CHANGE_MODAL_CONTENT", 2000);
                });

        }
    }


    deleteCity(id) {
        HttpApi.removeEntry(id)
            .then((response) => {
                if (response.status === 409) {
                    CommonServices.callAlertModal("fail", "TOGGLE_MAIN_MODAL", 1500);
                }
                else {
                    CommonServices.callTable(this.listCity.bind(this));
                    CommonServices.callAlertModal("success", "TOGGLE_MAIN_MODAL", 1500);
                }
            })
            .catch(() => {
                CommonServices.callAlertModal("fail", "CHANGE_MODAL_CONTENT", 2000);
            });
    }


    searchCity(name) {
        this.props.route.store.dispatch({ type: 'LOADING', showLoading: true });

        if(!CommonServices.emptySearch(name, this.listCity.bind(this))) {
            this.listType = 'search';
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