import React, { Component } from 'react';
import TableBody from "./TableBody";
export default class Table extends Component {

    constructor(props)
    {
        super(props);
        this.init();

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
                            if (i==0)
                                return <th className='sortHead' key={i} onClick={this.props.sort}>{item}</th>;
                                else return <th key={i}>{item}</th>;
                        }
                    )}
                </tr>
            </thead>
        )

    }
    render()
    {
        return(

                <table className="table table-striped table-bordered table-hover alinha container">
                    {this.printThead()}
                    <TableBody edit={this.props.edit} delete={this.props.delete} />
                </table>

            )
    }
}