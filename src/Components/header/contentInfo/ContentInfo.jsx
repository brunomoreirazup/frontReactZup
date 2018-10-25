import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ContentInfo extends Component {
  render() {
    const { reduceContentInfo, changeSize } = this.props;
    this.pageSize = '';

    let selectPageSize = '';

    if (reduceContentInfo.page_size) {
      selectPageSize = (
        <Fragment>
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
        </Fragment>


      );
    }
    return (
      <div className="row">
        <span className="form-inline content-info">
          {selectPageSize}
          {reduceContentInfo.totalElements ? reduceContentInfo.totalElements.sizePage : 0 }
          &nbsp; resultados encontrados.
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

ContentInfo.defaultProps = {
  reduceContentInfo: {},
};

ContentInfo.propTypes = {
  changeSize: PropTypes.func.isRequired,
  reduceContentInfo: PropTypes.shape({
    page_size: PropTypes.string,
    totalElements: PropTypes.objectOf(PropTypes.number),
    userPrefs: PropTypes.string,
  }),
};


export default connect(mapStateToProps)(ContentInfo);
