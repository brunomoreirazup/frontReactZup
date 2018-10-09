import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import Provider from "react-redux/es/components/Provider";
import Footer from "../footer/Footer";
import FooterTest from "../footer/FooterTest";
import {createStore} from "redux";
import reduceFooter from "../footer/reduceFooter";

const store = createStore(reduceFooter);
export default class Home extends Component{


    render(){
        return(
            <div>
                <Navbar/>

                <h1>Bem Vindo</h1>

            </div>

        )
    }
}