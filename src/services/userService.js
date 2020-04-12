import http from './httpService';
import { apiUrl } from '../config.json';
//import { toast } from 'react-toastify';

const apiEndpoint = `${apiUrl}/users`;

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
