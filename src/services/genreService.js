import http from './httpService';
import { apiUrl } from '../config.json';

export async function getGenres() {
  const { data } = await http.get(`${apiUrl}/genres`);
  return data;
}
