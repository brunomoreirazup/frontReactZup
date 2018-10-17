import React, { Component } from 'react';
export default class TableHead extends Component {


    render() {
        return (

            <thead className="thead-dark">

                {this.props.children}
                {/* {this.printThead()}
                    <TableBody edit={this.props.edit} delete={this.props.delete} /> */}



            </thead>

        )
    }
}