import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import HttpApi from "../http/HttpApi";
import AutoComplete from "../form/autoComplete/AutoComplete";
import CommonServices, { setListType, setFunction } from "../../CommonServices/CommonServices";

export default class Customers extends Component {

    constructor(props) {
        super(props);
        this.title = "Clientes";
        this.tHead = [
            { text: "Nome", className: 'SortHead customer' },
            { text: "Cidade", className: 'customer' },
            { text: "Editar", className: 'headerCommon' },
            { text: "Remover", className: 'headerCommon' }];
        this.form = this.CreateFormBody.bind(this);
        this.input_customer_name = '';
        this.customer_name = '';
        setListType("list");
        setFunction(this.listCustomers.bind(this), this.searchCustomer.bind(this));
    }

    componentDidMount() {
        CommonServices.callTable();
    }

    render() {
        return (
            <div>
                <Navbar currentPage={1} />

                <Dashboard
                    title={this.title}
                    tHead={this.tHead}
                    form={this.form}
                    add={this.addCustomer.bind(this)}
                    edit={this.editCustomer.bind(this)}
                    delete={this.deleteCustomer.bind(this)}
                    search={this.searchCustomer.bind(this)}
                    list={CommonServices.callTable.bind(this)}
                />
            </div>

        )
    }

    validateCityInput() {
        let checkStatus = this.props.route.store.getState().reduceAutoComplete.autoCompleteState.ok
        if (!checkStatus) {
            CommonServices.callAlertModal("blank", "CHANGE_MODAL_CONTENT", 2000);
        }
        return checkStatus;

    }

    loadPayloadCustomer() {

        let payload = {
            "name": this.input_customer_name.value,
            "city": this.props.route.store.getState().reduceAutoComplete.autoCompleteState.menu[0].id
        };

        return payload;
    }

    addCustomer() {

        let url = 'https://customers-challenge.herokuapp.com/customers';
        let method = 'POST';

        if (!CommonServices.validateFields(this.input_customer_name) && this.validateCityInput()) {
            CommonServices.sendData(url, method, this.loadPayloadCustomer());
        }
    }


    editCustomer(id) {

        let url = id;
        let method = 'PATCH';

        if (!CommonServices.validateFields(this.input_customer_name) && this.validateCityInput()) {
            CommonServices.sendData(url, method, this.loadPayloadCustomer());
        }
    }

    deleteCustomer(id) {
        CommonServices.sendData(id, "DELETE");
    }

    searchCustomer(name) {
        this.props.route.store.dispatch({ type: 'LOADING', showLoading: true });

        if (!CommonServices.emptySearch(name)) {
            HttpApi.makeGetRequest(`https://customers-challenge.herokuapp.com/customers/search/findByNameIgnoreCaseContaining?name=${name}`)
                .then(lista => {
                    CommonServices.removePageInfo();
                    CommonServices.storeSizeSearch(lista._embedded.customers);
                    this.reloadNewLista(lista);
                });
        }
    }

    listCustomers() {

        CommonServices.list("customers")
            .then(lista => {
                this.reloadNewLista(lista);
            });
    }

    reloadNewLista(lista) {
        let count = 0;
        let newLista = [];
        if(!lista._embedded.customers.length)
        {
            CommonServices.reloadList(newLista);

        }
        lista._embedded.customers
            .forEach((customers, i) => {
                let customerId = customers._links.self.href;
                let customerName = customers.name;
                let cityId;
                let cityName;
                return HttpApi.makeGetRequest(customers._links.city.href)
                    .then(city => {
                        count++;
                        cityId = city._links.self.href;
                        cityName = city.name;
                        newLista[i] = { id: customerId, cityId: cityId, data: [customerName, cityName] };
                        if (count === lista._embedded.customers.length) {
                            CommonServices.reloadList(newLista);
                        }
                    });
            });

    }

    CreateFormBody(action, id) {
        if (id !== undefined)
            this.loadForm(id);
        else {
            this.customer_name = "";

            this.props.route.store.dispatch({
                type: 'AUTO_COMPLETE_STATE', autoCompleteState: {
                    value: "",
                    menu: [],
                    ok: false,
                    loading: false
                }
            });
            this.props.route.store.dispatch({ type: "AUTOCOMPLETE", customerCity: "" })
        }

        return (
            <form onSubmit={(event) => { event.preventDefault(); action(id) }}>
                <label>Cliente:</label>
                <input autoComplete="off" id="input_customer_name" className="form-control" defaultValue={this.customer_name} type="text" placeholder="Insira um cliente" ref={(input) => this.input_customer_name = input} />
                <label>Cidade:</label>
                <AutoComplete search={this.loadCity} />

            </form>
        );
    }

    loadForm(id) {
        let customer_city = "";
        let cityId;
        let state = this.props.route.store.getState();
        state.reduceTable.table_body.forEach(element => {
            if (element.id === id) {
                this.customer_name = element.data[0];
                customer_city = element.data[1];
                cityId = element.cityId;
            }
            this.props.route.store.dispatch({
                type: 'AUTO_COMPLETE_STATE', autoCompleteState: {
                    value: customer_city,
                    menu: [{ name: customer_city, id: cityId }],
                    ok: true,
                    loading: false
                }
            });
        });
    }

    loadCity(value, cb) {

        if (!value)
            return cb([]);
        let url = `https://customers-challenge.herokuapp.com/cities/search/findByNameIgnoreCaseContaining?name=${value}`;
        HttpApi.makeGetRequest(url)
            .then(lista => {
                let newLista = lista._embedded.cities.map(city => {
                    let cityName = city.name;
                    let id = city._links.self.href;
                    return { name: cityName, id };
                }
                );
                return cb(newLista);
            });
    }
}

