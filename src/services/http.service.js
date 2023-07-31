import axios from 'axios';

const baseURL = 'http://localhost:5000/api/v1';

const http = axios.create({ baseURL: `${baseURL}/` });

function getAuthHeader() {
  const getToken = JSON.parse(localStorage.getItem('authToken'));
  let authHeader = { 'Content-Type': 'application/json' };
  if (getToken?.token) {
    authHeader = { Authorization: `Bearer ${getToken?.token}` };
  }
  return authHeader;
}

function get(url, headers = {}, params = {}) {
  return http.get(url, {
    params,
    headers: { ...getAuthHeader(), ...headers },
  });
}

function post(url, data, headers = {}, params = {}) {
  return http.post(url, data, {
    ...params,
    headers: { ...getAuthHeader(), ...headers },
  });
}

function put(url, data, headers = {}) {
  return http.put(url, data, { headers: { ...getAuthHeader(), ...headers } });
}

function remove(url, data, headers = {}) {
  return http.delete(url, {
    headers: { ...getAuthHeader(), ...headers },
    data,
  });
}

export default { http, get, post, put, remove };
