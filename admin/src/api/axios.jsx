import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3900/api/admin'
});