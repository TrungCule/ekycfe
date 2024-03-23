import ApiClient from '@/configs/ApiClient';

const END_POINT = 'http://localhost:8080/api/';

const api = new ApiClient(END_POINT).getInstance();

export const login = (params: { username: string; password: string }) => {
  return api.post('/authenticate', params);
};

export const register = (params: any) => {
  const reqParams = { ...params, role_id: 1 };
  return api.post('/register', reqParams);
};

export const forgetPassword = (params: { email: string }) => {
  return api.post('/forgetPassword', params);
};

export const resetPassword = (params: { email: string; verify_code: string }) => {
  return api.post('/forgetPassword/verify', params);
};
