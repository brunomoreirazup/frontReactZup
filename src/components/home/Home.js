import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import Autocomplete from "react-autocomplete";
import HttpApi from "../http/HttpApi";
export default class Home extends Component {


    constructor(props) {
        super(props);
        this.state = { value: "", unitedStates: [], loading: false,ok:false };
        this.requestTimer = null;
        this.city = "";
    }
    fakeRequest(value, cb) {

        if (!value)
            return cb([]);
        let url = `https://customers-challenge.herokuapp.com/cities/search/findByNameIgnoreCaseContaining?name=${value}`;
        HttpApi.makeGetRequest(url)
            .then(lista => {
                let newLista = lista._embedded.cities.map(city => {
                    let cityName = city.name;
                    let id = city._links.self.href;
                    return { name: cityName ,id};
                }
                );
                // this.props.route.store.dispatch({ type: 'TABLE_BODY', table_body: newLista });

                return cb(newLista);
            }
            );

    }

    render() {
        return (
            <div>
                <Navbar />

                <h1>Bem Vindo</h1>
                {/* <Autocomplete
                    getItemValue={(item) => item.label}
                    items={[
                        { label: 'apple' },
                        { label: 'banana' },
                        { label: 'pear' }
                    ]}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.label}
                        </div>
                    }
                    // value={value}
                    // onChange={(e) => value = e.target.value}
                    // onSelect={(val) => value = val}
                /> */}
                {console.log("unitedStates:")}
                {console.log(this.state.unitedStates)}
                <Autocomplete key={"test"}
                    value={this.state.value}
                    inputProps={{ id: 'states-autocomplete' }}
                    items={this.state.unitedStates}
                    getItemValue={(item) => item.name}
                    onSelect={(value, state) => {
                        this.setState({ value, unitedStates: [state] ,ok:true})
                        this.city = state.id;
                        }
                        
                    }
                    onChange={(event, value) => {
                        this.setState({ value, loading: true, unitedStates: [],ok:false })
                        // clearTimeout(this.requestTimer)
                        this.requestTimer = this.fakeRequest(value, (items) => {
                            this.setState({ unitedStates: items, loading: false })
                        })
                    }}
                    renderItem={(item, isHighlighted) => (
                        item.header ?
                            <div
                                className="item item-header"
                                key={item.header}
                            >{item.header}</div>
                            : <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                {item.name}
                            </div>
                    )}
                    renderMenu={(items, value) => (
                        <div className="menu">
                            {value === '' ? (
                                <div className="item">Digite o nome da cidade</div>
                            ) : this.state.loading ? (
                                <div className="item">Loading...</div>
                            ) : items.length === 0 ? (
                                <div className="item">No matches for {value}</div>
                            ) : <div>{items.map(item => <span>{item}</span>)}</div>}
                        </div>
                    )}
                    isItemSelectable={(item) => !item.header}
                />
                {this.state.ok ? <span>Ok</span> : <span></span>}
                
            <div>{this.city}</div>
            </div>

        )
    }
}