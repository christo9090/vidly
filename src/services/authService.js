import http from './httpService';
import { apiUrl } from '../config.json';
import jwtDecode from 'jwt-decode';

const tokenJwtKey = 'token';
const apiEndpoint = `${apiUrl}/auth`;

//Setting the jwt for all http requests to prevent bi direction dependency.
http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenJwtKey, jwt);
}

export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenJwtKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenJwtKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenJwtKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenJwtKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
