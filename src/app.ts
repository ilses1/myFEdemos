// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import React from 'react';
import {
  AppstoreOutlined,
  FileTextOutlined,
  LineChartOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import islandLogo from './assets/island-logo.svg';

export async function getInitialState(): Promise<{ name?: string }> {
  return {};
}

export const layout = () => {
  const menuIconMap: Record<string, React.ReactNode> = {
    '/dev-tools': React.createElement(ToolOutlined),
    '/animations': React.createElement(AppstoreOutlined),
    '/frontend-card': React.createElement(FileTextOutlined),
    '/chart': React.createElement(LineChartOutlined),
    '/chart/line': React.createElement(LineChartOutlined),
  };

  return {
    logo: islandLogo,
    menu: {
      locale: false,
    },
    avatarProps: {
      render: () => null,
    },
    menuDataRender: (menuData) => {
      const patchIcons = (items: any[]): any[] => {
        return items.map((item) => {
          const next = { ...item };
          if (!next.icon && typeof next.path === 'string' && menuIconMap[next.path]) {
            next.icon = menuIconMap[next.path];
          }
          if (Array.isArray(next.children) && next.children.length > 0) {
            next.children = patchIcons(next.children);
          }
          return next;
        });
      };

      return patchIcons(menuData);
    },
    menuTextRender: (_item, defaultDom, menuProps) => {
      if (menuProps?.collapsed) return null;
      return defaultDom;
    },
  };
};
