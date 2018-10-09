import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Navbar extends Component{


    render(){
        return(
            <nav className="navbar navbar-dark bg-dark">
                <ul className="nav justify-content-center">
                    <li className="navbar-item">
                        <Link className="navbar-brand" to="/">Front-End</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/cidades">Cidades</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/clientes">Clientes</Link>
                    </li>
                </ul>
            </nav>

        )
    }
}