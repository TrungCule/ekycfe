import ApiClient from '@/configs/ApiClient';
import { END_POINT } from '@/constants';

// const END_POINT = 'http://localhost:8080/api/';

const api = new ApiClient(END_POINT).getInstance();

export const login = (params: { username: string; password: string }) => {
  return api.post('/authenticate', params);
};

export const register = (params: any) => {
  const reqParams = { ...params };
  return api.post('/register', reqParams);
};

export const forgetPassword = (params: { email: string }) => {
  return api.post('/account/reset-password/init', params);
};

export const resetPassword = (params: { newPassword: string; key: string }) => {
  return api.post('/account/reset-password/finish', params);
};
