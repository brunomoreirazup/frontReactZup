import React, { Component } from 'react';
import searchBoxApi from './searchBoxApi';
import connect from "react-redux/es/connect/connect";

class SearchBox extends Component{

    search(event){

        event.preventDefault();
        const pages = {lista:[{id:1, nome:'Chuchu'},{id:2, nome:'Truquim'}]};
        this.props.dispatch({type: "SEARCH",pages});

        console.log(this.props.store);
    }

    render(){
        return(
            <form className='form-inline SearchBox' onSubmit={this.search.bind(this)}>
                <input className='form-control SearchBox-input' type='text' placeholder='Pesquisar...'/>
                <button className='btn btn-dark SearchIcon' type='submit'></button>
            </form>
        );
    }
}

function mapStateToProps(state){
    return{
        store: state.lista
    };
}
export default connect(mapStateToProps)(SearchBox);