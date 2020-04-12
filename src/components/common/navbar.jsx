import React, { Component } from 'react';
import { NavLink, Switch, Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          <i className="fa fa-video-camera" aria-hidden="true"></i> Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navbar-nav" id="navbarNav">
          <Switch></Switch>

          <NavLink className="nav-link nav-item" to="/movies">
            Movies
          </NavLink>

          <NavLink className="nav-link nav-item" to="/customers">
            Customers
          </NavLink>

          <NavLink className="nav-link nav-item" to="/rentals">
            Rentals
          </NavLink>

          {!user && (
            <React.Fragment>
              <NavLink className="nav-link nav-item" to="/login">
                Login
              </NavLink>

              <NavLink className="nav-link nav-item" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-link nav-item" to="/profile">
                {user.name}
              </NavLink>

              <NavLink className="nav-link nav-item" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
        <Switch></Switch>
      </nav>
    );
  }
}

export default Navbar;
