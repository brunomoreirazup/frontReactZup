import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

export default class SearchBox extends Component{

    render(){
        return(
            <form className='form-inline'>
                <input className='form-control' type='text' placeholder='Pesquisar...'/>
                <button className='btn btn-dark' type='submit'>AAA</button>
            </form>
        );
    }}