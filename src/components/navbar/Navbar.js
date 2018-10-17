import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Navbar extends Component{

    constructor(props)
    {
        super(props);
        this.isActivated = this.isActivated.bind(this);
    }

    isActivated(i)
    {
        if(i===this.props.currentPage)
            return "nav-item active \"";
        return "";
    }
    render(){
        return(

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Front-End</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="nav navbar-nav justify-content-center">

                        <li className={this.isActivated(0)}>
                            <Link className="nav-link" to="/cidades">Cidades</Link>
                        </li>
                        <li className={this.isActivated(1)}>
                            <Link className="nav-link" to="/clientes">Clientes</Link>
                        </li>
                    </ul>
                </div>
            </nav>

        )
    }
}