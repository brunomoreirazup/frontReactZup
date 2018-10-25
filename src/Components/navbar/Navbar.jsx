import React from 'react';
import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Front React Zup</Link>
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

          <li>
            <Link activeClassName="nav-item active" className="nav-link" to="/cidades">Cidades</Link>
          </li>
          <li>
            <Link activeClassName="nav-item active" className="nav-link" to="/clientes">Clientes</Link>
          </li>
        </ul>
      </div>
    </nav>

  );
}
