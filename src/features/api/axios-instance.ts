import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000/api';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
