import React, { Component } from 'react';

export default class ContentInfo extends Component{

    render(){
        this.pageSize = "";
        return(
            <div>
                <span className='form-inline'>
                    Exibindo 1 a
                        <select className='form-control custom-select' defaultValue="20"
                                ref={(input) => this.pageSize = input}
                                onChange={()=>this.props.changeSize(this.pageSize)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                      de N resultados.
                </span>
            </div>
        );
    }

}