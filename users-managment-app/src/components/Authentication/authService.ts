import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/api/auth';

const login = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/login`, credentials);
  return response.data;
};

const register = async (userData: {
  firstName: string;
  lastName: string;
  birthDate: string;
  mobile: string;
  email: string;
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/register`, userData);
  return response.data;
};

export default { login, register };
