import { defineConfig } from '@umijs/max';
import routes from './routes';

const isProd = process.env.NODE_ENV === 'production';
const repo = '/myFEdemos/';

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
  base: isProd ? repo : '/',
  publicPath: isProd ? repo : '/',
  routes,
  npmClient: 'pnpm',
});
