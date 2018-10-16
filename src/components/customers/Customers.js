import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import HttpApi from "../http/HttpApi";
import { connect } from 'react-redux';
import AutoCompleteTest from "../header/autocomplete/autocomplete";
import theme from 'react-toolbox/lib/autocomplete/theme.css';

class Customers extends Component {

    constructor(props) {
        super(props);
        this.title = "Clientes";
        this.tHead = ["Nome", "Cidade", "Editar", "Remover"];
        this.form = this.CreateFormBody.bind(this);
        this.input_customer_city = '';
        this.input_customer_name = '';
        this.customer_name = '';
        this.customer_city = '';
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
            "city": this.props.autoComplete.customerCity
        };

        HttpApi.makeChangeRequest(url, method, payload)
            .then(() => {
                this.listCustomers();
            });
    }

    editCustomer(id) {
        let url = id;
        let method = 'PUT';

        let payload = {
            "name": this.input_customer_name.value,
            "city": this.input_customer_city.value
        };

        HttpApi.makeChangeRequest(url, method, payload)
            .then(() => {
                this.listCustomers();
            });
    }
    deleteCustomer(id) {
        let url = id;
        console.log(id);

        HttpApi.removeEntry(url)
            .then((response) => {
                console.log("Response");
                console.log(response);
                this.listCustomers();
                this.props.route.store.dispatch({ type: "TOGGLE_MAIN_MODAL" })

            })

    }
    searchCustomer(name) {
        if (!name) {
            let defaultPages =
            {
                homePage: 1,
                lastPage: 1,
                currentPage: 1

            };
            this.props.route.store.dispatch({ type: 'PAGES', pages: defaultPages });

            this.props.route.store.dispatch({ type: "PAGE_SIZE", page_size: 5 })

            this.listCustomers();
        }

        else {
            HttpApi.makeGetRequest(`https://customers-challenge.herokuapp.com/customers/search/findByNameIgnoreCaseContaining?name=${name}`)
                .then(lista => {
                    let count = 0;
                    this.storeSizeSearch(lista);
                    let newLista = [];
                    if (!lista._embedded.customers.length) {
                        this.props.route.store.dispatch({
                            type: 'TABLE_BODY',
                            table_body: newLista
                        });

                        this.props.route.store.dispatch({ type: 'PAGE_SIZE', page_size: null });
                        this.props.route.store.dispatch({ type: 'PAGES', pages: null });
                    }
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
                                    if (count == lista._embedded.customers.length) {
                                        this.props.route.store.dispatch({
                                            type: 'TABLE_BODY',
                                            table_body: newLista
                                        });
                                        this.props.route.store.dispatch({ type: 'PAGE_SIZE', page_size: null });
                                        this.props.route.store.dispatch({ type: 'PAGES', page_size: null });
                                    }

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

    storeSizePages(json) {
        let size =
        {
            sizePage: json.page.totalElements
        };

        this.props.route.store.dispatch({ type: "TOTAL_ELEMENTS", totalElements: size });
    }

    storeSizeSearch(json) {
        let size =
        {
            sizePage: json._embedded.customers.length
        };

        this.props.route.store.dispatch({ type: "TOTAL_ELEMENTS", totalElements: size });
    }

    listCustomers() {
        let state = this.props.route.store.getState();
        console.log(state);
        let page = state.reduceFooter.pages.currentPage;
        let sizePage = state.reduceContentInfo.page_size;
        let sort = state.reduceTable.sort_order;

        HttpApi.makeGetRequest(`https://customers-challenge.herokuapp.com/customers?page=${page - 1}&size=${sizePage}&sort=name,${sort}`)
            .then(lista => {

                let count = 0;
                this.changeStorePages(lista);
                this.storeSizePages(lista);
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
                <input id="input_customer_name" className="form-control" defaultValue={this.customer_name} type="text" placeholder="Insira um cliente" ref={(input) => this.input_customer_name = input} />
                <label>Cidade:</label>
                <AutoCompleteTest theme={theme} />

            </form>
        );
    }

    loadForm(id) {
        let customer = "";
        let customer_city = "";
        let state = this.props.route.store.getState();
        state.reduceTable.table_body.forEach(element => {
            if (element.id == id) {
                customer = element.data[0];
                customer_city = element.data[1];
            }
        });
        this.customer_name = customer;
        this.customer_city = customer_city;
    }

}

function mapStateToProps(state) {
    return {
        autoComplete: state.reduceAutoComplete
    };

}

export default connect(mapStateToProps)(Customers);
