import React, { Component } from 'react';
import TableBody from "./TableBody";
export default class Table extends Component {

    constructor(props)
    {
        super(props);
        this.init();
        console.log("constructor table");

    }
    init()
    {
        this.printThead = this.printThead.bind(this);
    }
    printThead()
    {
        return (
            <thead className="thead-dark">
                <tr>
                    <th> # </th>
                    {this.props.thead.map((item,i)=>
                        {
                            return <th key={i}>{item}</th>;
                        }
                    )}
                </tr>
            </thead>
        )

    }
    render()
    {
        console.log("TableReader");
        return(
                <table className="table table-striped table-bordered">
                    {this.printThead()}
                    <TableBody />
                </table>

            )
    }
}