import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5208/',
  responseType: 'json',
  withCredentials: true,
});

export default api;
