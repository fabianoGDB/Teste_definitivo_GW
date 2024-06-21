import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import { getAuthData } from './storage';

export const BASE_URL = 'http://localhost:5213';


type LoginData = {
  username: string;
  password: string;
};


type RegisterData = {
  Email: string;
  Password: string;
};



export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa('password' + ':' + 'username'),
  };

  const data = qs.stringify({
    ...loginData
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/api/Auth/login',
    data,
    headers,
  });
};



export const requestBackendRegister = (registerData: RegisterData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa('password' + ':' + 'username'),
  };

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/api/Auth/register',
    data: registerData,
    
    headers,
  });
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + getAuthData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    //
    return config;
  },
  function (error) {
    //
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    //
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      history.push('/admin/auth');
    }
    return Promise.reject(error);
  }
);
