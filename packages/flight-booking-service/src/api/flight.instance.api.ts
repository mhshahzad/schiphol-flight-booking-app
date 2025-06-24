import axios from 'axios';

export const flightApiInstance = axios.create({
    baseURL: 'https://api.example.com', // Set your service's base URL here
});