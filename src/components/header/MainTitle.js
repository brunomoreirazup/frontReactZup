import React, { Component } from 'react';

export default class MainTitle extends Component{

    render(){
        return(
            <div className='MainTitle'>
                <h1>{this.props.title}</h1>
            </div>
        );
    }}