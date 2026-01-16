export interface ToolItem {
  name: string;
  icon: string;
  desc: string;
  url: string;
}

export interface Category {
  title: string;
  items: ToolItem[];
}

export const toolsData: Category[] = [
  {
    title: '前端框架',
    items: [
      {
        name: 'React',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicSB.svg',
        desc: '用于构建用户界面的 JavaScript 库',
        url: 'https://react.dev/',
      },
      {
        name: 'Vue',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
        desc: '渐进式 JavaScript 框架',
        url: 'https://vuejs.org/',
      },
      {
        name: 'Angular',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
        desc: '现代 Web 开发平台',
        url: 'https://angular.io/',
      },
    ],
  },
  {
    title: 'UI & CSS',
    items: [
      {
        name: 'Ant Design',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicSB.svg',
        desc: '企业级 UI 设计语言和 React 组件库',
        url: 'https://ant.design/',
      },
      {
        name: 'Element Plus',
        icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
        desc: '基于 Vue 3，面向设计师和开发者的组件库',
        url: 'https://element-plus.org/',
      },
      {
        name: 'Tailwind CSS',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
        desc: '功能类优先的 CSS 框架',
        url: 'https://tailwindcss.com/',
      },
    ],
  },
  {
    title: '构建工具',
    items: [
      {
        name: 'Webpack',
        icon: 'https://webpack.js.org/icon-square-small.85ba630cf0c5f29ae3e3.svg',
        desc: '静态模块打包工具',
        url: 'https://webpack.js.org/',
      },
      {
        name: 'Vite',
        icon: 'https://vitejs.dev/logo.svg',
        desc: '下一代前端开发与构建工具',
        url: 'https://vitejs.dev/',
      },
    ],
  },
  {
    title: '运行时 & 后端',
    items: [
      {
        name: 'Node.js',
        icon: 'https://nodejs.org/static/images/logo.svg',
        desc: '基于 Chrome V8 引擎的 JavaScript 运行时',
        url: 'https://nodejs.org/',
      },
      {
        name: 'Electron',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg',
        desc: '使用 JavaScript，HTML 和 CSS 构建跨平台桌面应用',
        url: 'https://www.electronjs.org/',
      },
    ],
  },
  {
    title: '部署 & 云服务',
    items: [
      {
        name: 'Vercel',
        icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png',
        desc: '为前端开发者提供的部署平台',
        url: 'https://vercel.com/',
      },
      {
        name: 'Docker',
        icon: 'https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png',
        desc: '应用容器引擎',
        url: 'https://www.docker.com/',
      },
      {
        name: 'Cloudflare',
        icon: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg',
        desc: '全球网络云平台',
        url: 'https://www.cloudflare.com/',
      },
    ],
  },
  {
    title: '可视化',
    items: [
      {
        name: 'ECharts',
        icon: 'https://echarts.apache.org/zh/images/favicon.png',
        desc: '一个基于 JavaScript 的开源可视化图表库',
        url: 'https://echarts.apache.org/',
      },
    ],
  },
  {
    title: '常用文档',
    items: [
      {
        name: 'MDN',
        icon: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
        desc: 'Web 文档资源',
        url: 'https://developer.mozilla.org/',
      },
      {
        name: 'TypeScript',
        icon: 'https://www.typescriptlang.org/icons/icon-48x48.png?v=8944a05a8b601855de116c8a56d3b3ae',
        desc: 'JavaScript 的超集',
        url: 'https://www.typescriptlang.org/',
      },
    ],
  },
];
