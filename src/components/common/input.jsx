import React from 'react';

const Input = ({
  name,
  value,
  label,
  onChange,
  captionMessage,
  type,
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        id={name}
        aria-describedby="emailHelp"
      />
      <small id="emailHelp" className="form-text text-muted">
        {captionMessage}
      </small>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
