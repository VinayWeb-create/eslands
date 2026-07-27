import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://eslands.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
