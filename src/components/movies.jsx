import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import Genre from './common/genre';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';
import { toast } from 'react-toastify';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 6,
    currentPage: 1,
    currentGenre: '',
    searchQuery: '',
    sortColumn: { currentSort: 'title', currentOrder: 'asc' },
  };

  async componentDidMount() {
    this.setState({ movies: await getMovies(), genres: await getGenres() }); //Prefilling the movies and genres.
  }

  handleDelete = async (id) => {
    const orginalMovies = this.state.movies;
    let movies = orginalMovies.filter((obj) => {
      return obj._id !== id;
    });
    this.setState({ movies });

    //Try to delete from DB and revert state if needed.
    try {
      await deleteMovie(id);
    } catch (err) {
      if (err.response && err.response.status === 404)
        toast.error('This movie has been deleted');

      this.setState({ movies: orginalMovies });
    }
  };

  addLike = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePage = (page) => {
    this.setState({ currentPage: page });
  };

  handleSelectedGenre = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies,
      currentGenre,
      searchQuery,
    } = this.state;
    const { currentSort, currentOrder } = this.state.sortColumn;

    let moviesFilteredByGenre = [];

    //Handle the search query
    if (searchQuery) {
      moviesFilteredByGenre = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      //Reduce filter based on array.
      moviesFilteredByGenre = currentGenre
        ? movies.filter((movie) => movie.genre._id === currentGenre._id)
        : movies;
    }

    //Sort current array.
    const moviesSorted = _.orderBy(
      moviesFilteredByGenre,
      [currentSort],
      [currentOrder]
    );

    const { length: count } = moviesFilteredByGenre;

    const moviesList = paginate(moviesSorted, currentPage, pageSize);

    return { count, moviesList };
  };

  handleSearch = (value) => {
    this.setState({
      searchQuery: value,
      currentGenre: '',
      currentPage: 1,
    });
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      currentGenre,
      sortColumn,
    } = this.state;
    const { user } = this.props;

    const { moviesList, count } = this.getPageData();

    //if (count === 0) return <p>There are no movies in the database</p>;
    return (
      <div className="row py-4">
        <div className="col-3">
          <Genre
            items={genres}
            onItemSelect={this.handleSelectedGenre}
            currentGenre={currentGenre}
          />
          <br />
          {user && (
            <Link to="/movies/new" className="btn btn-danger btn-block">
              + Add New Movie
            </Link>
          )}
        </div>
        <div className="col">
          <div className="row p-2 ">
            <div className="col ">
              <Pagination
                itemNumber={count}
                pageSize={pageSize}
                onPageChange={this.handlePage}
                currentPage={currentPage}
              />
            </div>
            <div className="col">
              <SearchBox
                value={this.state.searchQuery}
                onChange={this.handleSearch}
              />
            </div>
          </div>

          <MoviesTable
            sortColumn={sortColumn}
            moviesList={moviesList}
            addLike={this.addLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            user={user}
          />
          <p className="m-2">Showing {count} Movies From The Database</p>
        </div>
      </div>
    );
  }
}

export default Movies;
