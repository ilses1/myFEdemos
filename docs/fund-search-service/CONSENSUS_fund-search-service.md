# CONSENSUS_fund-search-service

## 需求描述和验收标准

- **功能**: 实现一个基金检索服务页面。
- **验收标准**:
  - 成功在 `config/routes.ts` 中添加路由。
  - 页面能正常访问。
  - 页面包含基础的搜索 UI。
  - 代码风格与项目一致（React.FC, LESS 模块, TypeScript）。

## 技术实现方案

- **路由**:
  ```typescript
  {
    name: '基金检索服务',
    path: '/frontend-card/fund-search-service',
    component: './FrontendCard/FundSearchService',
  }
  ```
- **组件**: `src/pages/FrontendCard/FundSearchService/index.tsx`。
- **样式**: `src/pages/FrontendCard/FundSearchService/index.less`。

## 技术约束和集成方案

- 使用 `antd` 和 `@ant-design/pro-components`。
- 遵循 `AGENTS.md` 中的导入规范和命名约定。

## 确认项

- [x] 路径对齐
- [x] 技术栈对齐
- [x] 命名规范对齐
