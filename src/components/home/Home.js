import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';

export default class Home extends Component {


    render() {
        return (
            <div>
                <div className="full-size">
                    <Navbar />
                    <h1 className='welcome'>Bem-vindo!</h1>
                </div>                
            </div>

        )
    }
}