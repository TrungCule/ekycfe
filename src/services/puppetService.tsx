import api from './index';

export const getUsers = () => {
  return api.get(`/admin/users`);
};

export const getUsersSearch = (q) => {
  return api.get(`/admin/users/search?textSearch=${q}`);
};

export const updateUser = (params: any) => {
  return api.post('/admin/account', params);
};

export const adminUpdateUser = (params: any) => {
  return api.put('/admin/users', params);
};

export const changePassword = (params: any) => {
  return api.post('/account/change-password', params);
};

export const resetPassword = (params: any) => {
  return api.post('/users/reset-password', params);
};

export const deleteUser = (params: { login: string }) => {
  return api.delete(`/admin/users/${params.login}`);
};

export const getUserInfo = () => {
  return api.get('/users/info');
};

export const getDetailUser = (login: string) => {
  return api.get(`/admin/users/${login}`);
};

export const exportUsers = (param: { pageNumber: number, pageSize: number, textSearch: string, typeName: string }) => {
  return api.post(`/admin/users/export-excel`, param);
};
