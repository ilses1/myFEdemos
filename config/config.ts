import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  history: {
    type: 'hash',
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  routes,
  npmClient: 'pnpm',
});
