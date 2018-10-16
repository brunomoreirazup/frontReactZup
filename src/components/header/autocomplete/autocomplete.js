import React, {Component} from 'react';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import theme from 'react-toolbox/lib/autocomplete/theme.css';
import {ThemeProvider} from 'react-css-themr';
import HttpApi from "../../http/HttpApi";

const source = {};

export default class AutoCompleteTest extends Component{
    state = {};

    constructor(props){
        super(props);
        this._init();
    }

    _init() {
        const url = 'https://customers-challenge.herokuapp.com/cities/search/findAllByOrderByNameAsc';
        HttpApi.makeGetRequest(url)
            .then(cities => cities._embedded.cities.forEach((city, i) => {
                source[city.name] = city.name;
            }));
    }

    handleChange = (value) => {
        this.setState({countries: value});
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
                    value={this.state.countries}
                />
            </ThemeProvider>
        );
    }
}
