import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ultimate-implicitly-hound.ngrok-free.app/',
  timeout: 5000,
  headers: {
    'accept': 'application/json',
    'Access-Control-Allow-Origin': "*",
    'content-type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Credentials': 'true',
    'ngrok-skip-browser-warning': 'true'
  },
});

export default api;