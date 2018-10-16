import React, {Component} from 'react';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import theme from 'react-toolbox/lib/autocomplete/theme.css';
import {ThemeProvider} from 'react-css-themr';
import HttpApi from "../../http/HttpApi";
import {connect} from 'react-redux';

const source = {};

class AutoCompleteTest extends Component{

    constructor(props){
        super(props);
        this._init();
    }

    _init() {
        const url = 'https://customers-challenge.herokuapp.com/cities/search/findAllByOrderByNameAsc';
        HttpApi.makeGetRequest(url)
            .then(cities => cities._embedded.cities.forEach((city, i) => {
                source[city._links.self.href] = city.name;
            }));
    }

    handleChange = (value) => {
        this.props.dispatch({ type: 'AUTOCOMPLETE' ,customerCity: value});
        console.log(this.props.autoComplete.customerCity);
    };

    render () {
        return (
            <ThemeProvider theme={theme}>
                <Autocomplete
                    className="form-group"
                    direction="auto"
                    selectedPosition="above"
                    label="Escolha uma cidade"
                    onChange={this.handleChange}
                    source={source}
                    multiple={false}
                    value={this.props.autoComplete.customerCity}
                />
            </ThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return{
        autoComplete : state.reduceAutoComplete
    };

}


export default connect(mapStateToProps)(AutoCompleteTest);
