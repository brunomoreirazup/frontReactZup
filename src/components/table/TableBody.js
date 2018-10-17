import React, { Component } from 'react';

export default class TableBody extends Component {

    render() {
        return(
            <tbody>
                {this.props.children}
            </tbody>
        )
    }
}