import React, { Component } from 'react';

export default class ContentInfo extends Component{

    render(){
        return(
            <div>
                <span className='form-inline'>
                    Exibindo 1 a
                        <select className='form-control'>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20" selected="selected">20</option>
                        </select>
                     de x resultados
                </span>
            </div>
        );
    }

}