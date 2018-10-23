import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ContentInfo extends Component {
  render() {
    const { reduceContentInfo, changeSize } = this.props;
    this.pageSize = '';

    let selectPageSize = '';

    if (reduceContentInfo.page_size) {
      selectPageSize = (
        <React.Fragment>
          Exibindo
          <select
            className="form-control custom-select"
            defaultValue={reduceContentInfo.page_size}
            ref={(input) => { this.pageSize = input; }}
            onChange={() => changeSize(this.pageSize)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          de &nbsp;
        </React.Fragment>


      );
    }
    return (
      <div>
        <span className="form-inline content-info">
          {selectPageSize}
          {reduceContentInfo.totalElements ? reduceContentInfo.totalElements.sizePage : 0 }
          resultados encontrados.
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reduceContentInfo: state.reduceContentInfo,
    reduceLoading: state.reduceLoading,

  };
}

ContentInfo.propTypes = {
  changeSize: PropTypes.func.isRequired,
  reduceContentInfo: PropTypes.func.isRequired,
};


export default connect(mapStateToProps)(ContentInfo);