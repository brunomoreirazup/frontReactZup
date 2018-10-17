import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import Copyright from "../copyright/Copyright";
export default class Home extends Component {


    render() {
        return (
            <div>
                <div className="full-size">
                    <Navbar />
                    <h1>Bem Vindo</h1>
                </div>
                <Copyright />
            </div>

        )
    }
}