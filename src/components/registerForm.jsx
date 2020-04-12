import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';
import { register } from '../services/userService';
import { loginWithJwt } from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label('Username'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label('Name'),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField(
            'username',
            'Username',
            'We never share your email address'
          )}
          {this.renderInputField('password', 'Password', '', 'password')}
          {this.renderInputField('name', 'Name', 'Full Name')}
          {this.renderSubmitButton('Submit')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
