import React, { Component } from 'react';
import Footer from "../footer/Footer";
import FooterTest from "../footer/FooterTest";
import Table from "../table/Table";
import TableTest from "../table/TableCitiesTest";
import Header from "../header/Header";

export default class Home extends Component{


    constructor(props)
    {
        super(props);
        this.init();
    }
    init()
    {
        this.title = this.props.title;
        this.tHead = this.props.tHead;
    }


    render(){
        return(
            <div>

                <Header title={this.title}/>
                <Table thead={this.tHead}/>
                <Footer />
                <FooterTest />

            </div>

        )
    }
}