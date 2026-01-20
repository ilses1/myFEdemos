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
    name: '动画集锦',
    path: '/animations',
    component: './AnimationCollection',
  },
  {
    name: '前端草稿',
    path: '/frontend-card',
    component: './FrontendCard',
    devOnly: true,
  },
  {
    name: '图表',
    path: '/chart',
    devOnly: true,
    routes: [
      {
        path: '/chart',
        redirect: '/chart/line',
      },
      {
        name: '折线图',
        path: '/chart/line',
        component: './Chart/LineChart',
      },
    ],
  },
];
