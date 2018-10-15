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
    }

    render(){
        return(
            <form className='form-inline form-group SearchBox' onSubmit={(event) => this.search(event)}>
                <input className='form-control SearchBox-input' type='text' placeholder='Pesquisar...' ref={(input) => this.input_search = input}/>
                <button className='btn btn-dark SearchIcon' type='submit'> </button>
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