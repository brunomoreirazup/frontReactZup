import React, { Component } from "react";
import "../buttonCss/button.css";

export default class BtEdit extends Component {
    render() {
        return (
            <React.Fragment>
                <button
                    type='button'
                    className='btn btn-info bt-table bt-edit'
                    onClick={this.props.onClick}>
                </button>
            </React.Fragment>
        )
    }
}

