import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';

//Backend Imports
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      numberInStock: '',
      dailyRentalRate: '',
      genreId: ''
    },
    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string().allow(''),
    title: Joi.string()
      .required()
      .min(5)
      .label('Title'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number In Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Rental Rate'),
    genreId: Joi.required()
  };

  async componentDidMount() {
    this.setState({ genres: await getGenres() }); //Set state for genres.
    this.findExistingMovie(); // Populate the movie form from database info.
  }

  findExistingMovie = async () => {
    let { id } = this.props.match.params; //Get ID from URL params
    if (id === 'new') return; //Opens blank form and return out of method

    //Try to get movie from db if not redirect.
    let movie = {};
    try {
      movie = await getMovie(id); //Get move object from DB.
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace('/not-found/'); //Redirect 404 if :id doesnt exists.
    }

    //Create state object if movie is found.
    const data = {
      _id: movie._id || '',
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genreId: movie.genre._id
    };
    this.setState({ data }); //Set State
  };

  doSubmit = async () => {
    const { history } = this.props; //Destructure
    await saveMovie(this.state.data); //Update DB using state.
    return history.push('/movies/'); //Redirect back to movies after save
  };

  render() {
    return (
      <div>
        <h1>Movie Form: {this.state.data.title || 'Add New Movie'}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField('title', 'Title')}
          {this.renderSelectField('genreId', 'Genre', this.state.genres)}

          {this.renderInputField(
            'numberInStock',
            'Number In Stock',
            '',
            'number'
          )}
          {this.renderInputField('dailyRentalRate', 'Rate', '', 'number')}

          <button
            className="btn btn-primary btn-sm"
            onClick={this.doSubmit}
            disabled={this.validate()}
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
