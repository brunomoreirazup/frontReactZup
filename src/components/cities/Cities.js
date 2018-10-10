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
        this.form = this.Createbody();
        this.footer = this.Createfooter();
    }
    render(){
        return(
            <div>
                <Navbar currentPage={0} />
                <Dashboard title={this.title} tHead = {this.tHead} form={this.form} footer={this.footer}/>
                <TableTest/>

            </div>

        )
    }

    Createbody = () =>{
        return(
            <form className="form-inline form-group">
                <label>Cidade:</label>
                <input className="form-control" type="text" placeholder="Insira uma cidade"/>
            </form>
        );
    }

    Createfooter = () =>{
        return(
            <button type="button" className="btn btn-dark">Salvar</button>
        );
    }




    addCity(){}
    editCity(id){}
    deleteCity(id){}
    searchCity(name){}
    changeCurrentPage(currentPage){}
    changePageSize(size){}
    listCity(){}
    loadForm(){}

}