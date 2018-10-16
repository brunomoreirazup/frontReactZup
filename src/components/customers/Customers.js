import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import HttpApi from "../http/HttpApi";
import Autocomplete from "../form/autoComplete/AutoComplete";
export default class Customers extends Component {

    constructor(props) {
        super(props);
        this.title = "Clientes";
        this.tHead = ["Nome", "Cidade", "Editar", "Remover"];
        this.form = this.CreateFormBody.bind(this);
    }

    componentDidMount() {
        this.listCustomers();
    }
    render() {
        return (
            <div>
                <Navbar currentPage={1} />

                <Dashboard title={this.title}
                           tHead={this.tHead}
                           form={this.form}
                           add={this.addCustomer.bind(this)}
                           edit={this.editCustomer.bind(this)}
                           delete={this.deleteCustomer.bind(this)}
                           search={this.searchCustomer.bind(this)}
                           list={this.listCustomers.bind(this)} />
            </div>

        )
    }
    addCustomer() {
        let url = 'https://customers-challenge.herokuapp.com/customers';
        let method = 'POST';

        let payload = {
            "name": this.input_customer_name.value,
            "city": this.input_customer_city.value
        };

        HttpApi.makeChangeRequest(url, method, payload)
            .then(() => {
                this.listCustomers();
            });
    }

    editCustomer(id) {

    }
    deleteCustomer(id) {
        let url = id;
        console.log(id);

        HttpApi.removeEntry(url)
            .then((response) => {
                console.log("Response");
                console.log(response);
                this.listCustomers();
                this.props.route.store.dispatch({type:"TOGGLE_MAIN_MODAL"})

            })

    }
    searchCustomer(name) {
        if (!name) this.listCustomers();
        else {
            HttpApi.makeGetRequest(`https://customers-challenge.herokuapp.com/customers/search/findByNameIgnoreCaseContaining?name=${name}`)
                .then(lista => {
                    let count = 0;
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
                                    newLista[i] = {id: customerId, data: [customerName, cityName]};
                                    if (count == lista._embedded.customers.length) this.props.route.store.dispatch({
                                        type: 'TABLE_BODY',
                                        table_body: newLista
                                    });
                                });
                        });
                });
        }
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
        let page = state.reduceFooter.pages.currentPage;
        let sizePage = state.reduceContentInfo.page_size;

        HttpApi.makeGetRequest(`https://customers-challenge.herokuapp.com/customers?page=${page - 1}&size=${sizePage}&sort=name,asc`)
            .then(lista => {

                let count = 0;
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

    CreateFormBody(action, id) {
        if (id != undefined)
            this.loadForm(id);
        else
            this.cidade_name = "";
        return (
            <form onSubmit={(event) => { event.preventDefault(); action(id) }}>
                <label>Cliente:</label>
                <input id="input_customer_name"className="form-control" defaultValue={this.customer_name} type="text" placeholder="Insira um cliente" ref={(input) => this.input_customer_name = input} />
                <Autocomplete search={this.loadCity.bind(this)}/>
            </form>
        );
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
                    return { name: cityName ,id};
                }
                );
                // this.props.route.store.dispatch({ type: 'TABLE_BODY', table_body: newLista });

                return cb(newLista);
            }
            );

    }

    loadForm(id) {
        let city = "";
        let state = this.props.route.store.getState();
        state.reduceTable.table_body.forEach(element => {
            if (element.id == id)
                city = element.data[0];
        });
        this.cidade_name = city;
    }

}