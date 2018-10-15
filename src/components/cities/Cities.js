import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import HttpApi from "../http/HttpApi";
export default class Cities extends Component{


    constructor(props)
    {
        super(props);
        this.init();
    }

    init()
    {
        this.title = "Cidades";
        this.tHead = ["Nome","Editar","Remover"];
        this.form = this.CreateFormBody.bind(this);
        this.input_cidade_name = "";
        this.cidade_name = "";
    }

    componentDidMount(){
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
                    list = {this.listCity.bind(this)}
                />

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
        };

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
        let url = id;
        console.log(id);

        HttpApi.removeEntry(url)
            .then( (response ) => {
                console.log("Response");
                console.log(response);
                if(response.status == 409)
                {
                    console.log("ja tem cliente");
                }
            })
    }

    searchCity(name){
        let url = '';
        if (name) url =`https://customers-challenge.herokuapp.com/cities/search/findByNameIgnoreCaseContaining?name=${name}`;
        else url =`https://customers-challenge.herokuapp.com/cities?page=1&${this.page}=${this.size}&sort=name,${this.sort}`;
            HttpApi.makeGetRequest(url)
                .then(lista => {
                        let newLista = lista._embedded.cities.map(city => {
                                let cityId = city._links.self.href;
                                let cityName = city.name;
                                return {id: cityId, data: [cityName]};
                            }
                        );
                        this.props.route.store.dispatch({type: 'TABLE_BODY', table_body: newLista});

                    }
                );

    }

    changeCurrentPage(currentPage){}

    listCity(){

        let state= this.props.route.store.getState();
        let page = state.reduceFooter.pages.currentPage;
        let sizePage = state.reduceContentInfo.page_size;

        HttpApi.makeGetRequest(`https://customers-challenge.herokuapp.com/cities?page=${page-1}&size=${sizePage}&sort=name,asc`)
            .then(lista => {
              this.changeStorePages(lista);
              let newLista = lista._embedded.cities.map(city =>{
                  let cityId = city._links.self.href;
                  let cityName = city.name;
                  return {id:cityId, data:[cityName]};
                  }
              );
              this.props.route.store.dispatch({ type: 'TABLE_BODY' ,table_body:newLista});
              

                }
            );
    }

    changeStorePages(json)
    {
        let page = 
            {
                homePage: 1,
                lastPage: json.page.totalPages,
                currentPage: json.page.number + 1
    
            };
        this.props.route.store.dispatch({ type: 'PAGES' ,pages: page });
    }

    loadForm(id){
        let city="";
        let state= this.props.route.store.getState();
        state.reduceTable.table_body.forEach(element => {
            if(element.id == id)
                city = element.data[0];
        });
        this.cidade_name = city;
    }

}