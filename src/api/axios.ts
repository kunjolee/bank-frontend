import axios from 'axios';
export const api = axios.create({
    // baseURL: 'http://localhost:8001/api',
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true,
})

