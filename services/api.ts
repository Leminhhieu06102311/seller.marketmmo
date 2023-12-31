import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ultimate-implicitly-hound.ngrok-free.app/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*',
    'ngrok-skip-browser-warning': 'true'
  },
});

export default api;