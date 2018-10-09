import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import FooterTest from "../footer/FooterTest";
import Table from "../table/Table";
import TableCustomersTest from "../table/TableCustomersTest";

export default class Home extends Component{


    render(){
        return(
            <div>
                <Navbar/>

                <h1>Customers</h1>

                <h2>Header</h2>

                <Table thead={["Nome","Cidade","",""]}/>
                <TableCustomersTest/>
                <Footer />
                <FooterTest />

            </div>

        )
    }
}