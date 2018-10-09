import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Provider from "react-redux/es/components/Provider";
import FooterTest from "../footer/FooterTest";

export default class Home extends Component{


    render(){
        return(
            <div>
                <Navbar/>

                <h1>Customers</h1>

                <h2>Header</h2>
                <h2>Table</h2>
                <Footer />
                <FooterTest />

            </div>

        )
    }
}