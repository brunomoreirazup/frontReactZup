import React, { Component } from 'react';
import { connect } from 'react-redux';
class ContentInfo extends Component {

    render() {

        this.pageSize = "";

        let selectPageSize = "";


        if (this.props.reduceContentInfo.page_size) {

            selectPageSize = (
                    <React.Fragment> Exibindo
                    <select className='form-control custom-select' defaultValue={this.props.reduceContentInfo.page_size}
                        ref={(input) => this.pageSize = input}
                        onChange={() => this.props.changeSize(this.pageSize)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    de &nbsp;
                    </React.Fragment>


            )
        }
        return (
            <div>
                <span className='form-inline content-info'>
                {selectPageSize}
                {this.props.reduceContentInfo.totalElements ? this.props.reduceContentInfo.totalElements.sizePage : 0} resultados encontrados.
                </span>
            </div>
        );
    }

}
function mapStateToProps(state) {
    return {
        reduceContentInfo: state.reduceContentInfo,
        reduceLoading: state.reduceLoading

    };

}

export default connect(mapStateToProps)(ContentInfo);