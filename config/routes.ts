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
      {
        name: '调仓导入',
        path: '/upload/rebalance',
        component: './Upload/Rebalance',
      },
      {
        name: 'PDF 预览',
        path: '/upload/pdf',
        component: './Upload/Pdf',
      },
      {
        name: 'PDF 预览 2',
        path: '/upload/pdf2',
        component: './Upload/Pdf2',
      },
      {
        name: 'PDF 预览 3',
        path: '/upload/pdf3',
        component: './Upload/Pdf3',
      },
      {
        name: 'Word 预览',
        path: '/upload/word',
        component: './Upload/Word',
      },
      {
        name: 'PPT 预览',
        path: '/upload/ppt',
        component: './Upload/Ppt',
      },
      {
        name: 'PPT 预览 2',
        path: '/upload/ppt2',
        component: './Upload/Ppt2',
      },
      {
        name: 'PPT 预览 3',
        path: '/upload/ppt3',
        component: './Upload/Ppt3',
      },
      {
        name: 'PPT 预览 4',
        path: '/upload/ppt4',
        component: './Upload/Ppt4',
      },
      {
        name: 'PPT 预览 5',
        path: '/upload/ppt5',
        component: './Upload/Ppt5',
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
      {
        name: '目录滚动',
        path: '/frontend-card/catalog-scroll',
        component: './FrontendCard/CatalogScroll',
      },
      {
        name: '多维度筛选',
        path: '/frontend-card/multi-filter',
        component: './FrontendCard/MultiFilter',
      },
      {
        name: '行业',
        path: '/frontend-card/industry',
        component: './FrontendCard/Industry',
      },
      {
        name: '主题',
        path: '/frontend-card/theme',
        component: './FrontendCard/Theme',
      },
      {
        name: '风格',
        path: '/frontend-card/style',
        component: './FrontendCard/Style',
      },
    ],
  },
  {
    name: '博客',
    path: '/blog',
    icon: 'BookOutlined',
    routes: [
      {
        path: '/blog',
        redirect: '/blog/scrollbar-button-fix',
      },
      {
        name: '滚动条按钮隐藏修复',
        path: '/blog/scrollbar-button-fix',
        component: './Blog/ScrollbarButtonFix',
      },
      {
        name: 'CSS 渐变过渡与颜色变量',
        path: '/blog/css-gradient-transition',
        component: './Blog/CssGradientTransition',
      },
      {
        name: 'ECharts Legend 对齐实战',
        path: '/blog/echarts-legend-align',
        component: './Blog/EchartsLegendAlign',
      },
    ],
  },
  {
    name: 'FigJam 基础',
    path: '/figjam-basics',
    component: './FigJamBasics',
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
