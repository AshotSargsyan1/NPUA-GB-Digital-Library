import axios from 'axios'

export const isLogged = localStorage.getItem('accessToken')

export const server = axios.create({
    baseURL: 'http://localhost:8000',
});