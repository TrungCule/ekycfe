import api from './index';

export const getUsers = () => {
  return api.get('/admin/users');
};

export const updateUser = (params: any, id: string) => {
  return api.put('/users/' + id, params);
};

export const resetPassword = (params: any) => {
  return api.post('/users/reset-password', params);
};

export const deleteUser = (params: { id: string }) => {
  return api.delete('/users/' + params.id);
};

export const getUserInfo = () => {
  return api.get('/users/info');
};

export const getUserById = (id: string) => {
  return api.get(`/users/${id}`);
};

