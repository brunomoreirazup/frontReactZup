import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

export default class BtnAdd extends Component{


    render(){
        return(
            <button type='button' className='btn btn-dark'>{this.props.type} {this.props.title}</button>
        );
    }
}