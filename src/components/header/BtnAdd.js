import React, { Component } from 'react';

export default class BtnAdd extends Component{


    render(){
        return(
            <button type='button' className='btn btn-dark'>Adiciona {this.props.title}</button>
        );
    }
}