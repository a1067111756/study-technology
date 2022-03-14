export default [
  {
    path: '/auth',
    layout: false,
    routes: [
      { name: 'login', path: '/auth/login', component: './auth/Login' },
      { name: 'register', path: '/auth/register', component: './auth/Register' },
      { component: './exception/404' }
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './welcome',
  },
  {
    name: 'user',
    path: '/user',
    icon: 'user',
    component: './user'
  },
  {
    name: 'role',
    path: '/role',
    icon: 'solution',
    component: './role'
  },
  {
    path: '/',
    redirect: '/auth/login',
  },
  {
    component: './404',
  },
];
