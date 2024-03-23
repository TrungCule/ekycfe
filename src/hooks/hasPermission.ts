// hasPermission.ts
const hasPermission = (pathname, user) => {
  if (listEnableRoutes(pathname)) return true;

  const permissions = {
    '/admin': ['ROLE_ADMIN'],
    '/users': ['ROLE_ADMIN'],
    '/home': ['ROLE_ADMIN', 'ROLE_USER'],
    '/user_info': ['ROLE_ADMIN', 'ROLE_USER'],
    '/change_password': ['ROLE_ADMIN', 'ROLE_USER'],
    '/user/[login]': ['ROLE_ADMIN', 'ROLE_USER'],
    // other routes...
  };

  const allowedRoles = permissions[pathname];

  if (!allowedRoles) return false;

  return allowedRoles.some((role) => user.authorities.map((i) => i.name).includes(role));
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
    '/user_info',
    '/user/[login]',
  ];

  return listRoutes.includes(pathname);
};

export default hasPermission;
