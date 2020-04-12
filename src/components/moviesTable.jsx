import React, { Component } from 'react';
import Table from './common/table';
import Like from './common/like';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

class MovieTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (movie) =>
        this.props.user ? (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ) : (
          movie.title
        ),
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      label: 'Like',
      content: (movie) => (
        <Like
          onClick={() => {
            this.props.addLike(movie);
          }}
          movie={movie}
        />
      ),
    },
  ];

  deleteButton = {
    label: 'Delete',
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();

    if (user && user.isAdmin) {
      this.columns.push(this.deleteButton);
    }
  }

  render() {
    const { moviesList, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={moviesList}
      />
    );
  }
}

export default MovieTable;
