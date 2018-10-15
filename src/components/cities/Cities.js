import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import TableTest from "../table/TableCitiesTest";
import HttpApi from "../http/HttpApi";
export default class Home extends Component{


    constructor(props)
    {
        super(props);
        this.init();
    }
    init()
    {
        this.title = "Cidades";
        this.tHead = ["Nome","",""];
        this.form = this.CreateFormBody.bind(this);
        this.input_cidade_name = "";
        this.cidade_name = "";
    }

    componentDidMount(){
        console.log("MONTOU");
        this.listCity();
    }

    render(){
        return(
            <div>
                <Navbar currentPage={0} />
                <Dashboard 
                    title={this.title} 
                    tHead = {this.tHead} 
                    form={this.form} 
                    add={this.addCity.bind(this)}
                    edit={this.editCity.bind(this)}
                    delete = {this.deleteCity.bind(this)}
                    search = {this.searchCity.bind(this)}
                />
                <TableTest/>

            </div>

        )
    }

    CreateFormBody(action,id){
        if(id != undefined)
            this.loadForm(id);
        else
            this.cidade_name="";
        return(
            <form onSubmit={(event) => {event.preventDefault(); action(id)}}>
                <label>Cidade:</label>
                <input className="form-control" defaultValue={this.cidade_name} type="text" placeholder="Insira uma cidade" ref={(input) => this.input_cidade_name = input}/>
            </form>
        );
    }

    addCity(){

        let url = 'https://customers-challenge.herokuapp.com/cities';
        let method = 'POST';

        let payload = {
            "name": this.input_cidade_name.value
        }

        HttpApi.makeChangeRequest(url,method,payload)
            .then(() => {
                this.listCity();
            });
    }

    editCity(id){

        let url = id;
        let method = 'PUT';
        let payload = {
            "name": this.input_cidade_name.value
        };

        HttpApi.makeChangeRequest(url,method,payload)
            .then(() => {
                this.listCity();
            });
    }

    deleteCity(id){
        let state= this.props.route.store.getState();
        state.table_body = state.table_body.filter(element => {
            if(element.id == id)
                return false;
            return true;
        });
        this.props.route.store.dispatch({ type: 'TABLE_BODY' ,table_body:state.table_body});
        this.props.route.store.dispatch({ type: 'TOGGLE_MAIN_MODAL'});
    }

    searchCity(name){
        let url = '';
        if (name) url =`https://customers-challenge.herokuapp.com/cities/search/findByNameIgnoreCaseContaining?name=${name}`;
        else url =`https://customers-challenge.herokuapp.com/cities?page=1&${this.page}=${this.size}&sort=name,${this.sort}`;
            HttpApi.getAllCities(url)
                .then(lista => {
                        let newLista = lista._embedded.cities.map(city => {
                                let cityId = city._links.self.href;
                                let cityName = city.name;
                                return {id: cityId, data: [cityName]};
                            }
                        );
                        console.log(newLista);
                        this.props.route.store.dispatch({type: 'TABLE_BODY', table_body: newLista});

                    }
                );

    }

    changeCurrentPage(currentPage){}

    listCity(){

        let store = this.props.route.store.getState();
        console.log("store listcity");
        console.log(store);
        let page = store.pages.currentPage;
        page=0;

        HttpApi.getAllCities(`https://customers-challenge.herokuapp.com/cities?page=${page}&size=${this.size}&sort=name,asc`)
            .then(lista => {
              console.log(lista);
              this.changeStorePages(lista);
              let newLista = lista._embedded.cities.map(city =>{
                  let cityId = city._links.self.href;
                  let cityName = city.name;
                  return {id:cityId, data:[cityName]};
                  }
              );
              console.log(newLista);
              this.props.route.store.dispatch({ type: 'TABLE_BODY' ,table_body:newLista});
              

                }
            );
    }

    changeStorePages(json)
    {
        console.log(json.page);
        let page = 
            {
                homePage: 1,
                lastPage: json.page.totalPages,
                nextPage: 0,
                prevPage: 0,
                currentPage: 1
    
            };
        this.props.route.store.dispatch({ type: 'PAGES' ,pages: page });
    }

    loadForm(id){
        let city="";
        let state= this.props.route.store.getState();
        state.table_body.forEach(element => {
            if(element.id == id)
                city = element.data[0];
        });
        console.log(city);
        this.cidade_name = city;
    }

}