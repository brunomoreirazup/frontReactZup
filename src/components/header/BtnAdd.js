import React, { Component } from 'react';

export default class BtnAdd extends Component {
    render() {
        return (
            <button type='button' id="btAdd" className='btn btn-success' onClick={this.props.click}>Adiciona {this.props.title}</button>
        );
    }
}