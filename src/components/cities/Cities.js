import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import TableTest from "../table/TableCitiesTest";
import HttpApi from "../http/HttpApi";
import MainModal from "../modal/MainModal";
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
        this.listCity("https://customers-challenge.herokuapp.com/cities");
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
                <input className="form-control" defaultValue={this.cidade_name}type="text" placeholder="Insira uma cidade" ref={(input) => this.input_cidade_name = input}/>
            </form>
        );
    }

    addCity(){

        let state= this.props.route.store.getState();

        let city=[{
            id : parseInt(Math.random()*1000),
            data:[""+this.input_cidade_name.value],
        }]
        if(state!= null && state.table_body != null)
            city=state.table_body.concat(city);
        console.log(city);
        this.props.route.store.dispatch({ type: 'TABLE_BODY' ,table_body:city});
    }
    editCity(id){
        let state= this.props.route.store.getState();
        state.table_body = state.table_body.map(element => {
            if(element.id == id)
            {
                element.data[0] = this.input_cidade_name.value;
            }
            return element;
        });
        this.props.route.store.dispatch({ type: 'TABLE_BODY' ,table_body:state.table_body});
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
    searchCity(name){}
    changeCurrentPage(currentPage){}
    changePageSize(size){}
    listCity(url){
        HttpApi.getAllCities(url)
            .then(lista => {
              console.log(lista);
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