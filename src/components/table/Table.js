import React, { Component } from 'react';
import {connect} from 'react-redux';

class Table extends Component {

    constructor(props)
    {
        super(props);
        this.printThead = this.printThead.bind(this);
    }
    printThead()
    {
        return (
            <thead>
                <tr>
                    <th> # </th>
                    {this.props.thead.map(item =>
                        {
                            return <th>{item}</th>;
                        }
                    )}
                </tr>
            </thead>
        )

    }
    printTbody()
    {
        console.log("printTbody");
        if(this.props.table_body == undefined)
            return "";
        return(
             <tbody>
                {this.props.table_body.map( (data , i) => {
                        return (
                            <tr key={data.id}>
                                <td>{i}</td>
                                {data.data.map(dataItem => {
                                    return <td>{dataItem}</td>
                                })}
                            </tr>
                        )
                    }

                )}
             </tbody>
        )


    }
    render()
    {
        console.log("TableReader");
        return(
                <table className="table">
                    {this.printThead()}
                    {this.printTbody()}
                </table>

            )
    }
}

function mapStateToProps(state) {
    return{
        table_body: state.table_body
    };

}

export default connect(mapStateToProps)(Table);