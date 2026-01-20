import { defineConfig } from '@umijs/max';
import routes from './routes';

const isProd = process.env.NODE_ENV === 'production';

const filterRoutes = (routesList: any[]): any[] => {
  return routesList
    .filter((route) => !route.devOnly)
    .map((route) => {
      if (route.routes) {
        return {
          ...route,
          routes: filterRoutes(route.routes),
        };
      }
      return route;
    });
};

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
  routes: isProd ? filterRoutes(routes) : routes,
  npmClient: 'pnpm',
  jsMinifier: 'terser',
  cssMinifier: 'cssnano',
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
});
