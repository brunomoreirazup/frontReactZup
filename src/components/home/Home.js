import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import Provider from "react-redux/es/components/Provider";
import Footer from "../footer/Footer";
import FooterTest from "../footer/FooterTest";
import reduceFooter from "../footer/reduceFooter";
import Header from "../header/Header";


export default class Home extends Component{


    render(){
        return(
            <div>
                <Navbar/>
                <Header title="HOME" />
                {/*<Footer />*/}
                {/*<FooterTest />*/}
            </div>

        )
    }
}