import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import Provider from "react-redux/es/components/Provider";
import Footer from "../footer/Footer";
import FooterTest from "../footer/FooterTest";
import {createStore} from "redux";
import reduceFooter from "../footer/reduceFooter";
import Header from "../header/Header";

const store = createStore(reduceFooter);
export default class Home extends Component{


    render(){
        return(
            <div>
                <Navbar/>
                <Header title="HOME" />
                {/*<Provider store={store}>*/}
                    {/*<Footer />*/}
                {/*</Provider>*/}
                {/*<Provider store={store}>*/}
                    {/*<FooterTest />*/}
                {/*</Provider>*/}
            </div>

        )
    }
}