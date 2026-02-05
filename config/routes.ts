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
    name: '文件上传',
    path: '/upload',
    routes: [
      {
        path: '/upload',
        redirect: '/upload/excel',
      },
      {
        name: 'excel',
        path: '/upload/excel',
        component: './Upload/Excel',
      },
    ],
  },
  {
    name: '前端草稿',
    path: '/frontend-card',
    devOnly: true,
    routes: [
      {
        path: '/frontend-card',
        redirect: '/frontend-card/card',
      },
      {
        name: '卡片',
        path: '/frontend-card/card',
        component: './FrontendCard',
      },
      {
        name: '表格',
        path: '/frontend-card/table',
        component: './FrontendCard/Table',
      },
      {
        name: '折线图',
        path: '/frontend-card/line-chart',
        component: './FrontendCard/LineChart',
      },
    ],
  },
  {
    name: '图表',
    path: '/chart',
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
