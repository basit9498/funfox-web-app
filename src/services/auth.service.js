import httpService from './http.service';

export const login = (body) =>
  httpService
    .post('/auth/login', body)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

export const register = (body) =>
  httpService
    .post('/auth/register', body)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));
