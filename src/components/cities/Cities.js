import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import HttpApi from "../http/HttpApi";


export default class Cities extends Component {

    constructor(props) {
        super(props);
        this.title = "Cidades";
        this.tHead = ["Nome", "Editar", "Remover"];
        this.form = this.CreateFormBody.bind(this);
        this.input_cidade_name = "";
        this.cidade_name = "";
        this.listType = "list";
    }

    componentDidMount() {
        this.callTable();
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
                    list={this.callTable.bind(this)}
                />
            </div>

        )
    }

    callAlertModal(showAlertType, actionType, time) {
        this.props.route.store.dispatch({ type: "CHANGE_MODAL_CONTENT", showAlert: showAlertType });
        setTimeout(() => this.props.route.store.dispatch({ type: actionType }), time);

    }

    callTable() {
        if (this.listType === 'search') {
            let keyword = this.props.route.store.getState().reduceSearch.search;
            this.searchCity(keyword);
        }
        else this.listCity();
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

    storeSizeSearch(json) {
        let size =
        {
            sizePage: json._embedded.cities.length
        };

        this.props.route.store.dispatch({ type: "TOTAL_ELEMENTS", totalElements: size });
    }

    storeSizePages(json) {
        let size =
        {
            sizePage: json.page.totalElements
        };

        this.props.route.store.dispatch({ type: "TOTAL_ELEMENTS", totalElements: size });
    }
    
    addCity() {
        let url = 'https://customers-challenge.herokuapp.com/cities';
        let method = 'POST';

        if (this.input_cidade_name.value === "") {
            this.callAlertModal("blank", "CHANGE_MODAL_CONTENT", 2000);
            this.input_cidade_name.focus();
        }

        else {

            let payload = {
                "name": this.input_cidade_name.value                
            };

            HttpApi.makeChangeRequest(url, method, payload)
                .then(() => {
                    this.callTable();
                    this.callAlertModal("success", "CHANGE_MODAL_CONTENT", 2000);
                })
                .catch(() => {
                    this.callAlertModal("fail", "CHANGE_MODAL_CONTENT", 2000);
                });
        }
    }

    editCity(id) {

        let url = id;
        let method = 'PUT';

        if (this.input_cidade_name.value === "") {
            this.callAlertModal("blank", "CHANGE_MODAL_CONTENT", 2000);
            this.input_cidade_name.focus();
        }

        else {
            let payload = {
                "name": this.input_cidade_name.value
            };

            HttpApi.makeChangeRequest(url, method, payload)
                .then(() => {
                    this.callTable();
                    this.callAlertModal("success", "TOGGLE_MAIN_MODAL", 1000);
                })
                .catch(() => {
                    this.callAlertModal("fail", "CHANGE_MODAL_CONTENT", 2000);
                });

        }
    }


    deleteCity(id) {
        HttpApi.removeEntry(id)
            .then((response) => {
                if (response.status === 409) {
                    this.callAlertModal("fail", "TOGGLE_MAIN_MODAL", 1500);
                }
                else {
                    this.callTable();
                    this.callAlertModal("success", "TOGGLE_MAIN_MODAL", 1500);
                }
            })
            .catch(() => {
                this.callAlertModal("fail", "CHANGE_MODAL_CONTENT", 2000);
            });
    }


    searchCity(name) {
        this.props.route.store.dispatch({ type: 'LOADING', showLoading: true });
        if (!name) {
            let defaultPages =
            {
                homePage: 1,
                lastPage: 1,
                currentPage: 1

            };
            this.props.route.store.dispatch({ type: 'PAGES', pages: defaultPages });

            this.props.route.store.dispatch({ type: "PAGE_SIZE", page_size: 5 });
            
            this.listCity();
        }

        else {
            this.listType = 'search';
            HttpApi.makeGetRequest(`https://customers-challenge.herokuapp.com/cities/search/findByNameIgnoreCaseContaining?name=${name}`)
                .then(lista => {
                    this.storeSizeSearch(lista);
                    let newLista = lista._embedded.cities.map(city => {
                        let cityId = city._links.self.href;
                        let cityName = city.name;
                        return { id: cityId, data: [cityName] };
                    });
                    this.props.route.store.dispatch({ type: 'TABLE_BODY', table_body: newLista });
                    this.props.route.store.dispatch({ type: 'PAGE_SIZE', page_size: null });
                    this.props.route.store.dispatch({ type: 'PAGES', page: null });
                    this.props.route.store.dispatch({ type: 'LOADING', showLoading: false });
                });
        }
    }

    

    listCity() {
        this.props.route.store.dispatch({ type: 'LOADING', showLoading: true });
        this.listType = 'list';

        let state = this.props.route.store.getState();
        let page = state.reduceFooter.pages.currentPage;
        let sizePage = state.reduceContentInfo.page_size;
        let sort = state.reduceTable.sort_order;


        HttpApi.makeGetRequest(`https://customers-challenge.herokuapp.com/cities?page=${page - 1}&size=${sizePage}&sort=name,${sort}`)
            .then(lista => {
                this.changeStorePages(lista);
                this.storeSizePages(lista);
                let newLista = lista._embedded.cities.map(city => {
                    let cityId = city._links.self.href;
                    let cityName = city.name;
                    return { id: cityId, data: [cityName] };
                }
                );
                this.props.route.store.dispatch({ type: 'TABLE_BODY', table_body: newLista });
                this.props.route.store.dispatch({ type: 'LOADING', showLoading: false });
            }
            );
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