export default [
  {
    path: '/',
    redirect: '/dev-tools',
  },
  {
    name: '开发工具',
    path: '/dev-tools',
    component: './DevTools',
  },
  {
    name: '前端草稿',
    path: '/frontend-card',
    component: './FrontendCard',
  },
  {
    name: '动画集锦',
    path: '/animations',
    component: './AnimationCollection',
  },
];
