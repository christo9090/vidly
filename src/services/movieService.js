import http from './httpService';
import { apiUrl } from '../config.json';
import { toast } from 'react-toastify';

export async function getMovies() {
  const { data } = await http.get(`${apiUrl}/movies`);
  return data;
}

export async function getMovie(id) {
  const { data } = await http.get(`${apiUrl}/movies/${id}`);
  return data;
}

export async function saveMovie(movie) {
  try {
    if (!movie._id) {
      await http.post(`${apiUrl}/movies/`, movie);
    } else {
      const existingMovie = { ...movie };
      delete existingMovie._id;
      await http.put(`${apiUrl}/movies/${movie._id}`, existingMovie);
    }
    return movie;
  } catch (err) {
    if (err.response && err.response.status === 404)
      toast.error('That movie does not exist in Database');
  }
}

export async function deleteMovie(id) {
  let deleteMovie = await http.delete(`${apiUrl}/movies/${id}`);
  console.log(deleteMovie);

  return deleteMovie;
}
