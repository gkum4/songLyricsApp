import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.lyrics.ovh/v1',
});

export default api;
