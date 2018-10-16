import React, { Component } from 'react';
import {connect} from 'react-redux';

class TableBody extends Component {

    constructor(props)
    {
        super(props);
        this.init();

    }
    init()
    {
        this.clearTable_Body();
    }
    clearTable_Body()
    {

        this.props.dispatch({ type: 'TABLE_BODY' ,table_body:null});
    }
    printTbody()
    {
        if(this.props.reduceTable == undefined || this.props.reduceTable.table_body == undefined)
            return <tbody></tbody>;
        return(
            <tbody>
            {this.props.reduceTable.table_body.map( (data , i) => {

                        return (
                        <tr key={data.id}>
                            <td>{i+1}</td>
                            {data.data.map( (dataItem,i)=> {
                                let keyItem =data.id+"|"+i;
                                return <td key={keyItem}>{dataItem}</td>
                            })}
                            <td><button type='button' className='btn btn-info bt-table bt-edit' onClick={this.props.edit.bind(this.props.edit,data.id)}></button></td>
                            <td><button type='button' id="btDelete" className='btn btn-danger bt-table bt-delete' onClick={this.props.delete.bind(this.props.delete,data.id)}></button></td>
                        </tr>
                    )
                }

            )
            }
            </tbody>
        )


    }
    render()
    {
        return this.printTbody();
    }
}

function mapStateToProps(state) {
    return{
        reduceTable: state.reduceTable
    };

}

export default connect(mapStateToProps)(TableBody);