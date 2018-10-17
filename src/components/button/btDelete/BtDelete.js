import React, { Component } from "react";
import "./btDelete.css";

export default class BtEdit extends Component {
    render() {
        return (
            <React.Fragment>
                <button
                    type='button'
                    className='btn btn-danger bt-table bt-delete'
                    onClick={this.props.onClick}>
                </button>
            </React.Fragment>
        )
    }
}

