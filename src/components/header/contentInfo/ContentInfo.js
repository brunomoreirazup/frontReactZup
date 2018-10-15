import React, { Component } from 'react';
import { connect } from 'react-redux';
class ContentInfo extends Component {

    render() {
        this.pageSize = "";
        return (
            <div>
                <span className='form-inline'>
                    Exibindo 1 a
                        <select className='form-control custom-select' defaultValue={this.props.reduceContentInfo.page_size}
                        ref={(input) => this.pageSize = input}
                        onChange={() => this.props.changeSize(this.pageSize)}>
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
function mapStateToProps(state) {
    return {
        reduceContentInfo: state.reduceContentInfo

    };

}

export default connect(mapStateToProps)(ContentInfo);