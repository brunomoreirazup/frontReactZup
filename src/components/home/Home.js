import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';

export default class Home extends Component {


    render() {
        return (
            <div>
                <div className="full-size">
                    <Navbar />
                    <h1>Bem Vindo</h1>
                </div>                
            </div>

        )
    }
}