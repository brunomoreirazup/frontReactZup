import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.input_search = '';
  }

  search(event) {
    const { search, dispatch } = this.props;
    event.preventDefault();
    search(this.input_search.value);
    dispatch({ type: 'SEARCH', keyword: this.input_search.value });
  }

  render() {
    return (
      <form className="form-inline form-group SearchBox headerItem" onSubmit={event => this.search(event)}>
        <input autoComplete="off" id="input_search_city_name" className="form-control SearchBox-input" type="text" placeholder="Pesquisar..." ref={(input) => { this.input_search = input; }} />
        <button id="submit_search_city_name" className="btn btn-dark SearchIcon" type="submit" />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state.list,
  };
}

SearchBox.propTypes = {
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(SearchBox);
