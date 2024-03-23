// hasPermission.ts
const hasPermission = (pathname, user) => {
  if (listEnableRoutes(pathname)) return true;

  const permissions = {
    '/admin': ['admin'],
    '/users': ['admin'],
    '/home': ['admin', 'user'],
    '/user_info': ['admin', 'user'],
    '/change_password': ['admin', 'user'],
    '/user/[id]': ['admin', 'user'],
    // other routes...
  };

  const allowedRoles = permissions[pathname];

  if (!allowedRoles) return false;

  return allowedRoles.includes(user.role);
};

const listEnableRoutes = (pathname) => {
  const listRoutes = [
    '/admin',
    '/home',
    '/login',
    '/register',
    '/',
    '/base',
    '/forget_password',
    '/reset_password',
    '/change_password',
    '/users',
  ];

  return listRoutes.includes(pathname);
};

export default hasPermission;
