import axios from 'axios';
import { API_ENDPOINT } from '../constants/api';

export const publicRequest = axios.create({
    baseURL: API_ENDPOINT,
});

export const userRequest = axios.create({
    baseURL: API_ENDPOINT,
});
userRequest.interceptors.request.use((config) => {
    console.log({config});
    const TOKEN = JSON.parse(localStorage.getItem('currentUser')) && JSON.parse(localStorage.getItem('currentUser'))?.token;
    if (TOKEN) {
        config.headers.token = `Bearer ${TOKEN}`;
    }
    return config;
});
