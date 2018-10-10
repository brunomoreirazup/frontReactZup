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
        console.log(this.props.table_body)
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
                            <td><button type='button' className='btn btn-dark'>Editar</button></td>
                            <td><button type='button' className='btn btn-dark'>Remover</button></td>
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
        console.log("TableReader");
        return this.printTbody();
    }
}

function mapStateToProps(state) {
    return{
        table_body: state.table_body
    };

}

export default connect(mapStateToProps)(TableBody);