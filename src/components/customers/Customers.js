import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/DashBoard";
import TableTest from "../table/TableCustomersTest";

export default class Home extends Component{

    constructor(props)
    {
        super(props);
        this.title = "Clientes";
        this.tHead = ["Nome","Cidade","",""];
        this.form = "";
    }
    render(){
        return(
            <div>
                <Navbar currentPage={1} />

                <Dashboard title={this.title} tHead={this.tHead}/>
                <TableTest/>
            </div>

        )
    }
    addCustomer()
    {

    }
    editCustomer(id)
    {

    }
    deleteCustomer(id)
    {

    }
    searchCustomer(name)
    {

    }
    changeCurrentPage(currentPage)
    {

    }
    changePageSize(size)
    {

    }
    listCustomers()
    {

    }
    loadForm()
    {

    }

}