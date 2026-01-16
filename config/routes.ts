export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '开发工具',
    path: '/dev-tools',
    component: './DevTools',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '前端卡片',
    path: '/frontend-card',
    component: './FrontendCard',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    name: ' CRUD 示例',
    path: '/table',
    component: './Table',
  },
];
