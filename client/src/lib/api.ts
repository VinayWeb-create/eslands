import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_BASE_URL) || '',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
