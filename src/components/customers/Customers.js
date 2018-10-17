import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import HttpApi from "../http/HttpApi";
import { connect } from 'react-redux';
import AutoComplete from "../form/autoComplete/AutoComplete";

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
        this.listType = "list";

    }

    componentDidMount() {
        this.callTable();
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
                           list={this.callTable.bind(this)}/>
                {/* <Copyright /> */}
            </div>

        )
    }

    callAlertModal(showAlertType, actionType, time){
        this.props.route.store.dispatch({type: "CHANGE_MODAL_CONTENT", showAlert: showAlertType});
        setTimeout(() => this.props.route.store.dispatch({type: actionType}), time);

    }

    addCustomer() {
        let url = 'https://customers-challenge.herokuapp.com/customers';
        let method = 'POST';
        let city = this.props.route.store.getState().reduceAutoComplete.autoCompleteState.menu[0];
        if (this.input_customer_name.value == "" || city == undefined) {
            this.callAlertModal("blank","CHANGE_MODAL_CONTENT",2000);
            this.input_customer_name.focus();
        }

        else{
            let payload = {
                "name": this.input_customer_name.value,
                "city": city.id
            };

            HttpApi.makeChangeRequest(url, method, payload)
                .then(() => {
                    this.callTable();
                    this.callAlertModal("success","CHANGE_MODAL_CONTENT",2000);
                })
                .catch(() => {
                    this.callAlertModal("fail","CHANGE_MODAL_CONTENT",2000);
                });
        }

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

    editCustomer(id) {
        let url = id;
        let method = 'PATCH';

        if(!this.props.route.store.getState().reduceAutoComplete.autoCompleteState.ok){
            this.callAlertModal("success","TOGGLE_MAIN_MODAL",1000);
            return;
        }

        let city = this.props.route.store.getState().reduceAutoComplete.autoCompleteState.menu[0];

        if (this.input_customer_name.value == "" || city == undefined) {
            this.callAlertModal("blank","CHANGE_MODAL_CONTENT",2000);
            this.input_customer_name.focus();
        }

        else{
            let payload = {
                "name": this.input_customer_name.value,
                "city": this.props.route.store.getState().reduceAutoComplete.autoCompleteState.menu[0].id
            };

            HttpApi.makeChangeRequest(url, method, payload)
                .then(() => {
                    this.callTable();
                    this.callAlertModal("success","TOGGLE_MAIN_MODAL",1000);
                })
                .catch(() => {
                    this.callAlertModal("fail","CHANGE_MODAL_CONTENT",2000);
                });
        }


    }
    deleteCustomer(id) {
        let url = id;
        console.log(id);

        HttpApi.removeEntry(url)
            .then((response) => {
                console.log("Response");
                console.log(response);
                this.callTable();
                this.callAlertModal("success","TOGGLE_MAIN_MODAL",1500);
            })
            .catch(() => {
                this.callAlertModal("fail","CHANGE_MODAL_CONTENT",2000);
            });

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
            this.listType ='search';
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

    callTable() {
        if(this.listType=='search'){
            let keyword=this.props.route.store.getState().reduceSearch.search;
            console.log(keyword);
            this.searchCustomer(keyword);
        }
        else this.listCustomers();
        console.log(this.listType);
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
        console.log('lista');
        this.listType='list';
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
                        let cityId;
                        let cityName;
                        return HttpApi.makeGetRequest(customers._links.city.href)
                            .then(city => {
                                count++;
                                cityId = city._links.self.href;
                                cityName = city.name;
                                newLista[i] = { id: customerId,cityId: cityId, data: [customerName, cityName] };
                                if (count == lista._embedded.customers.length) this.props.route.store.dispatch({ type: 'TABLE_BODY', table_body: newLista });
                            });
                    });
            });
    }

    CreateFormBody(action, id) {
        if (id != undefined)
            this.loadForm(id);
        else
        {
            this.props.dispatch({ type: 'AUTO_COMPLETE_STATE', autoCompleteState:{
                value:"",
                menu:[],
                ok:false,
                loading:false
            }});
            this.customer_name = "";
            this.props.route.store.dispatch({type:"AUTOCOMPLETE",customerCity:""})
        }
            
        return (
            <form onSubmit={(event) => { event.preventDefault(); action(id) }}>
                <label>Cliente:</label>
                <input id="input_customer_name" className="form-control" defaultValue={this.customer_name} type="text" placeholder="Insira um cliente" ref={(input) => this.input_customer_name = input} />
                <label>Cidade:</label>
                <AutoComplete search={this.loadCity} />

            </form>
        );
    }

    loadForm(id) {
        let customer = "";
        let customer_city = "";
        let cityId;
        let state = this.props.route.store.getState();
        state.reduceTable.table_body.forEach(element => {
            if (element.id == id) {
                this.customer_name = element.data[0];
                customer_city = element.data[1];
                cityId = element.cityId;
            }
            this.props.dispatch({ type: 'AUTO_COMPLETE_STATE', autoCompleteState:{
                value:customer_city,
                menu:[{name:customer_city,id:cityId}],
                ok:true,
                loading:false
            }});
        });
    }

}

function mapStateToProps(state) {
    return {
        autoComplete: state.reduceAutoComplete
    };

}

export default connect(mapStateToProps)(Customers);
