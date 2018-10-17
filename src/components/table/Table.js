import React, { Component } from 'react';
export default class Table extends Component {
    render() {
        return (

            <table className="table table-striped table-bordered table-hover alinha container">
                {this.props.children}
            </table>

        )
    }
}