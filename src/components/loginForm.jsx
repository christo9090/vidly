import React from 'react';
import Joi from '@hapi/joi';
import Form from './common/form';
import { login, getCurrentUser } from '../services/authService';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };
  //Schema for Joi
  schema = {
    username: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    //Calling login auth.
    const { username, password } = this.state.data;
    try {
      await login(username, password);

      const { state } = this.props.location;
      console.log(state);
      window.location = state ? state.from.pathname : '/';
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField(
            'username',
            'Username',
            'We never share your email address'
          )}
          {this.renderInputField('password', 'Password', '', 'password')}
          {this.renderSubmitButton('Submit')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
