import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import image from '../../img/homepage.gif';

export default class Home extends Component {


    render() {
        return (
            <div>
                <div className="full-size">
                    <Navbar />
                    <h1 className='welcome'>Bem-vindo!</h1>
                    {/* <img src={image} className='home-image' alt='home'></img> */}
                </div>                
            </div>

        )
    }
}