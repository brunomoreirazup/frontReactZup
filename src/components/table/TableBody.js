import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class TableBody extends Component {

    render() {
        return(
            <tbody>
                {this.props.children}
            </tbody>
        )
    }
}