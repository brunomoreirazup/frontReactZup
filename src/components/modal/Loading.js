import React, {Component} from 'react';
import '../../css/loading.css';
import loadImage from '../../img/loading.gif';

export default class Loading extends Component{


    render(){
        return(
            <tbody>
            <tr>
                <td colSpan={5} className="loading">
                    <img src={loadImage} className="load-image" alt="Loading..."></img>
                </td>
            </tr>
            </tbody>
        );
    }
}