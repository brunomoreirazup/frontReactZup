import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import FooterTest from "../footer/FooterTest";
import Table from "../table/Table";
import TableTest from "../table/TableCitiesTest";

export default class Home extends Component{


    constructor(props)
    {
        super(props);
        this.init();
    }
    init()
    {

    }


    render(){
        return(
            <div>
                <Navbar currentPage={0} />

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