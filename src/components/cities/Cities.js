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
        this.form = "";
    }
    render(){
        return(
            <div>
                <Navbar currentPage={0} />
                <Dashboard title={this.title} tHead = {this.tHead}/>
                <TableTest/>

            </div>

        )
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