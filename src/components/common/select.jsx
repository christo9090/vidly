import React from 'react';

const Select = ({
  name,
  value,
  label,
  captionMessage,
  error,
  onChange,
  optionArr = []
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        name={name}
        id={name}
        onChange={onChange}
        value={value}
      >
        <option value="">-- select an option --</option>
        {optionArr.map(option => {
          return (
            <option value={option._id} key={option._id}>
              {option.name}
            </option>
          );
        })}
      </select>
      <small id="emailHelp" className="form-text text-muted">
        {captionMessage}
      </small>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
