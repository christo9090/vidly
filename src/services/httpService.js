import axios from 'axios';
import { toast } from 'react-toastify';
import logService from './logService';

axios.interceptors.response.use(null, (error) => {
  console.log(error);

  if (!error.response) {
    //logService.log(error);
    toast('Unexpected error occurred. Try again.');
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt,
};
