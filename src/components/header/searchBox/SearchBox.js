import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";

class SearchBox extends Component{

    constructor(props){
        super(props);
        this.input_search = '';
    }

    search(event){

        event.preventDefault();
        this.props.search(this.input_search.value);
        this.props.dispatch({type:"SEARCH", keyword: this.input_search.value});
    }

    render(){
        return(
            <form className='form-inline form-group SearchBox' onSubmit={(event) => this.search(event)}>
                <input autoComplete ="off" id="input_search_city_name" className='form-control SearchBox-input' type='text' placeholder='Pesquisar...' ref={(input) => this.input_search = input}/>
                <button id="submit_search_city_name"className='btn btn-dark SearchIcon' type='submit'> </button>
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