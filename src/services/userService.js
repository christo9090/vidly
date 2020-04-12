import http from './httpService';
//import { toast } from 'react-toastify';

const apiEndpoint = `/users`;

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
