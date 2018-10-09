import React, { Component } from 'react';
import {connect} from 'react-redux';

class Table extends Component {

    constructor(props)
    {
        super(props);

        this.init();

    }
    init()
    {
        this.printThead = this.printThead.bind(this);
        this.clearTable_Body();
    }
    clearTable_Body()
    {

        this.props.dispatch({ type: 'TABLE_BODY' ,table_body:null});
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
    printTbody()
    {
        console.log("printTbody");
        if(this.props.table_body == undefined)
            return <tbody></tbody>;
        return(
             <tbody>
                {this.props.table_body.map( (data , i) => {
                        return (
                            <tr key={data.id}>
                                <td>{i}</td>
                                {data.data.map( (dataItem,i)=> {
                                    return <td key={data.id+i}>{dataItem}</td>
                                })}
                                <td>Editar</td>
                                <td>Excluir</td>
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
                <table className="table table-striped table-bordered">
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