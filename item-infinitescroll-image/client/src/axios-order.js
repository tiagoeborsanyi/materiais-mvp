import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tiagoemerick.com/'
});

export default instance;