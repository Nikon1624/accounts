import axios from 'axios';

const TOKEN = 'a33ed683e402d7637ed0223517ebfff45668620f';
const HTTP = axios.create({
    baseURL: 'http://localhost:8000',
    responseType: 'json',
    headers: {
        Authorization: `Token ${TOKEN}`,
    }
});

export {HTTP};