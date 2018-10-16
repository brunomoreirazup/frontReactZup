import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import Autocomplete from "react-autocomplete";
export default class Home extends Component {


    render() {
        return (
            <div>
                <Navbar />

                <h1>Bem Vindo</h1>
                <Autocomplete
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
                />
            </div>

        )
    }
}