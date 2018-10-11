import React, { Component } from 'react';
import searchBoxApi from './searchBoxApi';
import connect from "react-redux/es/connect/connect";

class SearchBox extends Component{

    constructor(props){
        super(props);
        this.input_search = '';
    }

    search(event){

        event.preventDefault();
        const pages = {lista:[{id:1, nome:'Chuchu'},{id:2, nome:'Truquim'}]};
        this.props.dispatch({type: "SEARCH",pages});

        console.log(this.props.store);
    }

    render(){
        return(
            <form className='form-inline form-group SearchBox' onSubmit={(event) => {event.preventDefault(); this.props.search(this.input_search.value);}}>
                <input className='form-control SearchBox-input' type='text' placeholder='Pesquisar...'ref={(input) => this.input_search = input}/>
                <button className='btn btn-dark form-control SearchIcon' type='submit'></button>
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