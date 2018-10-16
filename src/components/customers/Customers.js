import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import HttpApi from "../http/HttpApi";
import Autocomplete from "react-autocomplete";
import AutoCompleteTest from "../header/autocomplete/autocomplete";
export default class Customers extends Component {

    constructor(props) {
        super(props);
        this.title = "Clientes";
        this.tHead = ["Nome", "Cidade", "Editar", "Remover"];
        this.form = "";
    }

    componentDidMount() {
        this.listCustomers();
    }

    render() {
        return (
            <div>
                <Navbar currentPage={1} />
                <AutoCompleteTest/>
                <Dashboard title={this.title} tHead={this.tHead} list={this.listCustomers.bind(this)} />
            </div>

        )
    }
    addCustomer() {

    }
    editCustomer(id) {

    }
    deleteCustomer(id) {

    }
    searchCustomer(name) {

    }
    changeStorePages(json) {
        let page =
        {
            homePage: 1,
            lastPage: json.page.totalPages,
            currentPage: json.page.number + 1

        };
        this.props.route.store.dispatch({ type: 'PAGES', pages: page });
    }

    listCustomers() {
        let state = this.props.route.store.getState();
        console.log("store listcustomer");
        console.log(state);
        let page = state.reduceFooter.pages.currentPage;
        let sizePage = state.reduceContentInfo.page_size;

        HttpApi.makeGetRequest(`https://customers-challenge.herokuapp.com/customers?page=${page - 1}&size=${sizePage}&sort=name,asc`)
            .then(lista => {

                let count = 0;
                console.log(lista);
                this.changeStorePages(lista);
                let newLista = [];

                lista._embedded.customers
                    .forEach((customers, i) => {
                        let customerId = customers._links.self.href;
                        let customerName = customers.name;
                        let cityName;
                        return HttpApi.makeGetRequest(customers._links.city.href)
                            .then(city => {
                                count++;
                                cityName = city.name;
                                newLista[i] = { id: customerId, data: [customerName, cityName] };
                                if (count == lista._embedded.customers.length) this.props.route.store.dispatch({ type: 'TABLE_BODY', table_body: newLista });
                            });
                    });
            });
    }
    loadForm() {

    }

}