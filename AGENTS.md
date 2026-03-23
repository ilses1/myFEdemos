# AGENTS.md

## 项目概览

UmiJS Max (v4) + React 18 + Ant Design 5 前端演示项目。使用 TypeScript 开发，pnpm 包管理器，部署到 Vercel。

## 构建与开发命令

```bash
pnpm dev          # 启动开发服务器 (别名: pnpm start)
pnpm build        # 通过 @umijs/max 进行生产构建
pnpm format       # 对所有文件运行 Prettier
pnpm setup        # 重新生成 Umi 临时文件 (.umi/)
```

**本项目无测试脚本**，未安装测试框架。如需添加测试，建议使用 Vitest + React Testing Library。

## 代码检查与格式化

- **ESLint**: 继承 `@umijs/max/eslint` (`.eslintrc.js`)
- **Stylelint**: 继承 `@umijs/max/stylelint` (`.stylelintrc.js`)
- **Prettier**: 80 字符宽度，单引号，尾逗号 (`all`)，自动排序导入 (`.prettierrc`)
- **lint-staged**: 提交时对 `*.{js,jsx,ts,tsx}`、`*.{css,less}`、`*.{md,json}` 运行 Prettier
- **Husky**: pre-commit 钩子运行 lint-staged；commit-msg 钩子存在

手动运行代码检查：

```bash
pnpm format                    # Prettier 格式化所有文件
npx eslint src --ext .ts,.tsx  # ESLint 检查
npx stylelint "src/**/*.less"  # Stylelint 检查
```

## 项目结构

```
config/         # Umi 配置 (config.ts, routes.ts)
src/
  pages/        # 文件路由 — 每个页面一个文件夹
  components/   # 共享组件 (目前为空)
  models/       # Umi dva 模型 (全局状态)
  services/     # API 请求函数
  utils/        # 工具函数
  constants/    # 共享常量
  assets/       # 静态资源 (SVG, 图片)
  app.ts        # 运行时配置: 布局、初始状态、主题
  access.ts     # 权限定义
```

## 代码风格指南

### 导入规范

- React 默认导入: `import React from 'react'` (显式导入，不使用解构)
- 命名导入: `import { useEffect, useRef, useState } from 'react'`
- 分组顺序: 1) 第三方库, 2) `@umijs/max` / `@ant-design/*`, 3) `@/` 别名, 4) 相对路径 (`./`)
- Prettier 插件 `prettier-plugin-organize-imports` 自动排序，无需手动调整

### 组件规范

- 使用 `React.FC` 类型: `const MyPage: React.FC = () => { ... }`
- 默认导出在文件底部: `export default MyPage`
- 组件内部辅助函数优先使用函数声明

### TypeScript 规范

- 避免 `any`，使用具体类型或泛型
- 使用 `type` 定义类型别名 (如 `type ThemeMode = 'light' | 'dark'`)
- Umi 运行时配置回调中可使用 `any` (当类型复杂时)

### 命名约定

| 元素 | 约定 | 示例 |
| --- | --- | --- |
| 文件/文件夹 | PascalCase (页面/组件), camelCase (工具) | `DevTools/`, `format.ts` |
| 组件 | PascalCase | `LineChart`, `PanelCard` |
| 变量/函数 | camelCase | `handleClick`, `userData` |
| 常量 | UPPER_SNAKE_CASE | `THEME_MODE_STORAGE_KEY` |
| CSS/LESS 类名 | camelCase | `mainCard`, `headerRow` |

### 样式规范

- 使用 LESS 模块: `import styles from './index.less'`
- 通过 `styles.className` 访问
- 动态/一次性样式可使用内联样式
- 通过 Ant Design 的 `ConfigProvider` + `theme.algorithm` 支持暗黑模式

### 状态与数据

- 全局状态通过 Umi models (`src/models/`)
- 本地状态: `useState`，DOM/实例使用 `useRef`
- 昂贵计算使用 `useMemo` (如 mock 数据生成)
- 添加事件监听器时，effects 必须返回清理函数

### 错误处理

- 使用 early return 保护 DOM refs: `if (!chartRef.current) return`
- 对可能为 undefined 的值使用可选链 (`?.`)
- 无全局错误边界，在组件中本地处理错误

### UI 库

- Ant Design v5 (`antd`)
- ProComponents (`@ant-design/pro-components`)，如 `PageContainer`
- 图标: `@ant-design/icons`
- 图表: `echarts` (v6)

### 路由

- 在 `config/routes.ts` 中配置，使用 hash 路由
- 页面从 `src/pages/` 目录自动发现
- 使用 `devOnly: true` 标记仅开发环境显示的路由

## 代码约定总结

| 方面       | 约定                             |
| ---------- | -------------------------------- |
| 包管理器   | pnpm                             |
| 格式化工具 | Prettier (80 列，单引号，尾逗号) |
| 样式文件   | LESS 模块 (`.less`)              |
| 导出方式   | 文件底部默认导出                 |
| 组件类型   | `React.FC`                       |
| 提交信息   | 无强制约定                       |

## 关键配置文件

| 文件               | 用途                                   |
| ------------------ | -------------------------------------- |
| `.prettierrc`      | Prettier 配置: 80 字符，单引号，尾逗号 |
| `.eslintrc.js`     | ESLint 继承 Umi Max 配置               |
| `.stylelintrc.js`  | Stylelint 继承 Umi Max 配置            |
| `.lintstagedrc`    | 提交前运行 Prettier                    |
| `tsconfig.json`    | 继承 Umi 生成的 TypeScript 配置        |
| `config/config.ts` | Umi 主配置: 插件、布局、构建选项       |
| `config/routes.ts` | 路由定义，支持嵌套和 `devOnly`         |
