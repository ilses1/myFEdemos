import { defineConfig } from '@umijs/max';
import routes from './routes';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'isles',
  },
  favicons: ['/island-logo.svg'],
  history: {
    type: 'hash',
  },
  base: '/',
  publicPath: isProd ? './' : '/',
  routes,
  npmClient: 'pnpm',
});
