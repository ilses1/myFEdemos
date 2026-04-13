# ALIGNMENT_fund-search-service

## 项目上下文分析

- **项目类型**: UmiJS Max (v4) + React 18 + Ant Design 5 前端演示项目。
- **技术栈**: TypeScript, pnpm, LESS 模块, ECharts (可选)。
- **现有模式**: 页面位于 `src/pages/`，路由配置在 `config/routes.ts`。
- **目标位置**: `src/pages/FrontendCard/FundSearchService`。

## 需求理解确认

- **原始需求**: 给 `config/routes.ts` 前端草稿新建一个“路由基金检索服务”，并新建对应 tsx, less。
- **边界确认**:
  - 新增路由路径: `/frontend-card/fund-search-service`。
  - 新增组件名称: `FundSearchService`。
  - 文件包括: `index.tsx`, `index.less`。
- **需求理解**: 在“前端草稿”子菜单下添加一个新的功能页，用于演示基金检索服务的 UI。
- **疑问澄清**:
  - Q: 页面具体功能？ A: 默认为基础的检索界面，包含搜索框、筛选条件和结果列表。
  - Q: 样式风格？ A: 遵循 Ant Design 5 风格，支持暗黑模式。

## 智能决策策略

- **组件目录**: 放在 `src/pages/FrontendCard/FundSearchService/`。
- **路由配置**: 在 `config/routes.ts` 的 `前端草稿` 路由组中添加。
- **UI 实现**: 使用 `ProTable` 或 `ProList` (来自 `@ant-design/pro-components`) 以实现快速原型。
