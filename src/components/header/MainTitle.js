import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

export default class MainTitle extends Component{

    render(){
        return(
            <div>
                <h1>{this.props.title}</h1>
            </div>
        );
    }}