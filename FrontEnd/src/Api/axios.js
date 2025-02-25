import axios from 'axios';


const Api_Client = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, 
})

export default Api_Client