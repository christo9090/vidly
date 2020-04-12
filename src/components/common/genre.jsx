import React, { Component } from 'react';

class Genre extends Component {
  render() {
    const {
      items,
      onItemSelect,
      textProperty,
      valueProperty,
      currentGenre
    } = this.props;

    return (
      <div className="list-group">
        <button
          type="button"
          className={
            currentGenre === ''
              ? 'list-group-item list-group-item-action active'
              : 'list-group-item list-group-item-action'
          }
          onClick={() => onItemSelect('')}
        >
          All Genres
        </button>
        {items.map(genre => {
          return (
            <button
              key={genre[valueProperty]}
              type="button"
              className={
                currentGenre === genre
                  ? 'list-group-item list-group-item-action active'
                  : 'list-group-item list-group-item-action'
              }
              onClick={() => onItemSelect(genre)}
            >
              {genre[textProperty]}
            </button>
          );
        })}
      </div>
    );
  }
}

Genre.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default Genre;
