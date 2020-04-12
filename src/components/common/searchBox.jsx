import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      className="form-control"
      name="search"
      id="search"
      placeholder="Search..."
      type="text"
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
