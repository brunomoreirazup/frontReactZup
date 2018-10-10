import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import TableTest from "../table/TableCitiesTest";
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
        this.cidade_name = "";
    }
    render(){
        return(
            <div>
                <Navbar currentPage={0} />
                <Dashboard title={this.title} tHead = {this.tHead} form={this.form} add={this.addCity.bind(this)}/>
                <TableTest/>

            </div>

        )
    }

    CreateFormBody(action,data){
        return(
            <form onSubmit={(event) => {event.preventDefault(); action(data)}}>
                <label>Cidade:</label>
                <input className="form-control" type="text" placeholder="Insira uma cidade" ref={(input) => this.cidade_name = input}/>
            </form>
        );
    }

    addCity(){
        let state= this.props.route.store.getState();

        let city=[{
            id : parseInt(Math.random()*1000),
            data:[""+this.cidade_name.value],
        }]
        if(state!= null && state.table_body != null)
            city=state.table_body.concat(city);
        console.log(city);
        this.props.route.store.dispatch({ type: 'TABLE_BODY' ,table_body:city});
    }
    editCity(id){}
    deleteCity(id){}
    searchCity(name){}
    changeCurrentPage(currentPage){}
    changePageSize(size){}
    listCity(){}
    loadForm(){}

}