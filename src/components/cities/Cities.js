import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Provider from "react-redux/es/components/Provider";
import FooterTest from "../footer/FooterTest";
import Table from "../table/Table";
import TableTest from "../table/TableTest";

export default class Home extends Component{


    constructor(props)
    {
        super(props);


    }


    render(){
        return(
            <div>
                <Navbar/>

                <h1>Cities</h1>
                <h2>Header</h2>
                <Table thead={["Nome","",""]}/>
                <TableTest />
                <Footer />
                <FooterTest />

            </div>

        )
    }
}