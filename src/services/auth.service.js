import axios from 'axios';

// const API_URL = 'https://frozen-river-95471.herokuapp.com/api/v1/';
// const D_API_URL = 'http://localhost:7000/api/v1/';
const D_API_URL = 'https://covibuddy.herokuapp.com/api/v1/';

const register = (name, email, password, type, contact, location) => axios.post(`${D_API_URL}users`, {
  name,
  email,
  password,
  type,
  contact,
  location,
})
  .then(response => {
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  });

const login = (email, password) => axios
  .post(`${D_API_URL}login`, {
    email,
    password,
  })
  .then(response => {
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  });

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
