import axios from 'axios';

export const INSTANCE = getInstance()

function getInstance() {
    return axios.create({
        baseURL: 'http://localhost:3600',
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/json'
        }
    })
}
