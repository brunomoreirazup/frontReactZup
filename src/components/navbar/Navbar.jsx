import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.isActivated = this.isActivated.bind(this);
  }

  isActivated(i) {
    const { currentPage } = this.props;
    if (i === currentPage) {
      return 'nav-item active "';
    }
    return '';
  }

  render() {
    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Front-End</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="nav navbar-nav justify-content-center">

            <li className={this.isActivated(0)}>
              <Link className="nav-link" to="/cidades">Cidades</Link>
            </li>
            <li className={this.isActivated(1)}>
              <Link className="nav-link" to="/clientes">Clientes</Link>
            </li>
          </ul>
        </div>
      </nav>

    );
  }
}
Navbar.propTypes = {
  currentPage: PropTypes.func.isRequired,
};
