// api/login.js
import axios from 'axios';

export const loginRequest = async (data) => {
    return await axios.post('http://localhost:4000/login', data);
};
