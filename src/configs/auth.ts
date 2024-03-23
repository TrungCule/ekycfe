import ApiClient from '@/configs/ApiClient';
import { END_POINT } from '@/constants';
import { message } from 'antd';

// const AUTH_API = 'http://localhost:8088/api/v1';
const api = new ApiClient(END_POINT).getInstance();

export const getTokenId = () => {
  const accessToken = JSON.parse(localStorage.getItem('token') || '');
  return accessToken;
};

export const getRefreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  const res = await api.post('/refresh-token', { refresh_token });
  if (res.error) {
    message.error(res.error);
    return '';
  }
  localStorage.setItem('token', res.data?.token);
  localStorage.setItem('refresh_token', res.data?.refreshToken);
  return res.data?.token;
};

export const login = (nextFn = () => {}) => {
  try {
    api.post('/authenticate');
    nextFn();
  } catch (e) {
    // console.log(e);
    // Handle exception here
    // logout();
  }
};

export const callback = async (nextFn) => {
  try {
    // Login successfully
    nextFn();
  } catch (e) {
    // console.log(e);
    // Handle exception here
    // logout();
  }
};

export const logout = async () => {
  try {
    // const auth
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
