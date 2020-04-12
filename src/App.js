import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getCurrentUser } from './services/authService';
//Components
import Movies from './components/movies';
import Navbar from './components/common/navbar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/common/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';
//CSS
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {};

  componentDidMount() {
    let user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main role="main" className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />

            <Route path="/login" component={LoginForm} />

            <Route path="/logout" component={Logout} />

            <ProtectedRoute path="/movies/:id" component={MovieForm} />

            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />

            <Route path="/customers" component={Customers} />

            <Route path="/rentals" component={Rentals} />

            <Route path="/not-found" component={NotFound} />

            <Redirect exact from="/" to="/movies" />

            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
