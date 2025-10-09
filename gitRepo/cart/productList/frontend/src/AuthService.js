import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000';

export const signup = async (username, password) => {
    const response = await axios.post(`${API_URL}/signup`, { username, password });
    return response.data;
}

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password })
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return access_token;
}

export const getProtectedData = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/protected`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};