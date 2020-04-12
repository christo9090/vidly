import http from './httpService';
import { toast } from 'react-toastify';

export async function getMovies() {
  const { data } = await http.get(`/movies`);
  return data;
}

export async function getMovie(id) {
  const { data } = await http.get(`/movies/${id}`);
  return data;
}

export async function saveMovie(movie) {
  try {
    if (!movie._id) {
      await http.post(`/movies/`, movie);
    } else {
      const existingMovie = { ...movie };
      delete existingMovie._id;
      await http.put(`/movies/${movie._id}`, existingMovie);
    }
    return movie;
  } catch (err) {
    if (err.response && err.response.status === 404)
      toast.error('That movie does not exist in Database');
  }
}

export async function deleteMovie(id) {
  let deleteMovie = await http.delete(`/movies/${id}`);
  console.log(deleteMovie);

  return deleteMovie;
}
