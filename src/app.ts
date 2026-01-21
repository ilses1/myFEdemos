// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import {
  AppstoreOutlined,
  FileTextOutlined,
  LineChartOutlined,
  MoonOutlined,
  SunOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Switch, theme as antdTheme } from 'antd';
import React from 'react';
import islandLogo from './assets/island-logo.svg';

type ThemeMode = 'light' | 'dark';

type InitialState = {
  name?: string;
  themeMode: ThemeMode;
};

const THEME_MODE_STORAGE_KEY = 'theme_mode';

const getThemeModeFromStorageOrSystem = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';

  const stored = localStorage.getItem(THEME_MODE_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  const prefersDark = window.matchMedia?.(
    '(prefers-color-scheme: dark)',
  )?.matches;
  return prefersDark ? 'dark' : 'light';
};

export async function getInitialState(): Promise<InitialState> {
  return {
    themeMode: getThemeModeFromStorageOrSystem(),
  };
}

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>(() =>
    getThemeModeFromStorageOrSystem(),
  );

  React.useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_MODE_STORAGE_KEY) return;
      setThemeMode(getThemeModeFromStorageOrSystem());
    };

    const onCustomThemeChange = (event: Event) => {
      const next = (event as CustomEvent).detail;
      if (next === 'light' || next === 'dark') {
        setThemeMode(next);
        return;
      }
      setThemeMode(getThemeModeFromStorageOrSystem());
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('theme_mode_change', onCustomThemeChange);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('theme_mode_change', onCustomThemeChange);
    };
  }, []);

  const algorithm =
    themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;
  return React.createElement(
    ConfigProvider,
    { theme: { algorithm } },
    children,
  );
};

export function rootContainer(container: React.ReactNode) {
  return React.createElement(ThemeProvider, null, container);
}

export const layout = ({ initialState, setInitialState }: any) => {
  const menuIconMap: Record<string, React.ReactNode> = {
    '/dev-tools': React.createElement(ToolOutlined),
    '/animations': React.createElement(AppstoreOutlined),
    '/frontend-card': React.createElement(FileTextOutlined),
    '/chart': React.createElement(LineChartOutlined),
    '/chart/line': React.createElement(LineChartOutlined),
  };

  const themeMode: ThemeMode = initialState?.themeMode ?? 'light';

  return {
    logo: islandLogo,
    navTheme: themeMode === 'dark' ? 'dark' : 'light',
    menu: {
      locale: false,
    },
    avatarProps: {
      render: () => null,
    },
    rightContentRender: (_headerProps: any, dom: React.ReactNode) => {
      const checked = themeMode === 'dark';
      return React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement(Switch, {
          checked,
          checkedChildren: React.createElement(MoonOutlined),
          unCheckedChildren: React.createElement(SunOutlined),
          onChange: (nextChecked) => {
            const nextThemeMode: ThemeMode = nextChecked ? 'dark' : 'light';
            localStorage.setItem(THEME_MODE_STORAGE_KEY, nextThemeMode);
            setInitialState?.({
              ...(initialState || {}),
              themeMode: nextThemeMode,
            });
            window.dispatchEvent(
              new CustomEvent('theme_mode_change', { detail: nextThemeMode }),
            );
          },
        }),
        dom,
      );
    },
    menuDataRender: (menuData) => {
      const patchIcons = (items: any[]): any[] => {
        return items.map((item) => {
          const next = { ...item };
          if (
            !next.icon &&
            typeof next.path === 'string' &&
            menuIconMap[next.path]
          ) {
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
