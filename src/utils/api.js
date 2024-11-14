import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Replace with ResilientDB server URL

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const fetchAppointments = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/appointments/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
  }
};
