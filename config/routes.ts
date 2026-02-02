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
    name: '布局',
    path: '/layout',
    icon: 'Layout',
    routes: [
      {
        path: '/layout',
        redirect: '/layout/split-layout',
      },
      {
        name: '分栏布局',
        path: '/layout/split-layout',
        component: './SplitLayout',
      },
    ],
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
      {
        name: 'k线图',
        path: '/chart/kchart',
        component: './Chart/kChart',
      },
      {
        name: '收益图',
        path: '/chart/incomechart',
        component: './Chart/incomeChart',
      },
    ],
  },
];
