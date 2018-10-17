import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../../css/loading.css'

class Loading extends Component{
    constructor(props) {
        super(props);
    }


    createLoading() {
        if(this.props.reduceLoading != null && this.props.reduceLoading.loading)
            return(
               <div className="loading"></div>
            );
        else return "";
    }

    render(){
        return(
            <div>
                {this.createLoading()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        reduceLoading: state.reduceLoading
    };
}

export default connect(mapStateToProps)(Loading);
