import React, { Component } from 'react';

export default class BtnAdd extends Component{


    render(){
        return(
            <button type='button' className='btn btn-dark' onClick={this.props.click}>Adiciona {this.props.title}</button>
        );
    }
}