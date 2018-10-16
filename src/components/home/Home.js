import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import Autocomplete from "react-autocomplete";
import HttpApi from "../http/HttpApi";
export default class Home extends Component {


    render() {
        return (
            <div>
                <Navbar />
                <h1>Bem Vindo</h1>
            </div>

        )
    }
}