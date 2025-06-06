import axios from 'axios';

const API = 'http://localhost:8000/api/users/';

export async function registerUser(username, password) {
    const res = await axios.post(`${API}register/`, { username, password });
    localStorage.setItem('token',res.data.token);
    return res.data;
}

export async function loginUser(username, password) {
    const res = await axios.post(`${API}login/`, { username, password });
    localStorage.setItem('token', res.data.token);
    return res.data;
}