import React, { Component } from 'react';

export default class SearchBox extends Component{



    render(){
        return(
            <form className='form-inline SearchBox'>
                <input className='form-control SearchBox-input' type='text' placeholder='Pesquisar...'/>
                <button className='btn btn-dark SearchIcon' type='submit'></button>
            </form>
        );
    }}