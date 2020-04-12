import React, { Component } from 'react';
import Joi from '@hapi/joi';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    //Validate entire form using Joi.
    const schema = Joi.object(this.schema);
    const { error } = schema.validate(this.state.data, {
      abortEarly: false
    });

    if (!error) return null; //Check for errors.
    const errors = {}; //Loop through and add errors to new object.
    error.details.forEach(err => {
      errors[err.path[0]] = err.message;
    });
    //console.log(errors);
    return errors;
  };

  validateProperty = ({ name, value }) => {
    //Validate a single input property
    const obj = { [name]: value }; //Create obj based on input
    const schema = Joi.object({ [name]: this.schema[name] }); //Pair down schema to fit input
    const { error } = schema.validate(obj); //Validation
    return !error ? null : error.details[0].message; //Return error or null.
  };

  handleSubmit = e => {
    e.preventDefault(); //Stop html table function
    const errors = this.validate(); //Call error handler
    this.setState({ errors: errors || {} }); //Set state if no errors
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    //Validating Current Field
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    //Setting state on every change
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderSubmitButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInputField = (name, label, captionMessage, type = 'text') => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        captionMessage={captionMessage}
        error={errors[name]}
        type={type}
      />
    );
  };

  renderSelectField = (name, label, optionArr, captionMessage) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        captionMessage={captionMessage}
        error={errors[name]}
        optionArr={optionArr}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
