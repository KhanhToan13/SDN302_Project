import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9999/api',
});

export default api;