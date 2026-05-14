# ALIGNMENT - PDF2 预览任务

## 1. 项目上下文分析

- **项目类型**: UmiJS Max (v4) + React 18 + Ant Design 5。
- **当前状态**: 已有 `PDF 预览` (使用 `@react-pdf-viewer/core`)。
- **技术栈**: React, TypeScript, Ant Design。
- **文件上传逻辑**: 复用 `DocumentUploadPreview` 组件。

## 2. 需求理解确认

- **原始需求**: 增加一个 pdf 预览 `pdf2` 路由，使用原生预览。
- **边界确认**:
  - 新增路由 `/upload/pdf2`。
  - 实现方式：在 `DocumentUploadPreview` 中增加对 `pdf2` 类型的支持，使用浏览器原生的 PDF 渲染能力（如 `<iframe>` 或 `<embed>`）。
  - 功能要求：支持文件上传、展示文件信息、显示上传进度、原生预览、支持下载。
- **需求理解**: 用户希望对比第三方 PDF 渲染库与浏览器原生渲染的效果或性能。

## 3. 智能决策策略

- **实现方案**:
  - 修改 `DocumentKind` 类型，增加 `pdf2`。
  - 在 `DocumentUploadPreview` 中根据 `kind === 'pdf2'` 使用 `<iframe>` 渲染 `previewUrl`。
  - 新建 `src/pages/Upload/Pdf2/index.tsx` 页面组件。
  - 在 `config/routes.ts` 中配置新路由。
- **疑问澄清**:
  - 原生预览是否需要特定的交互（如全屏、打印）？
    - _决策_: 浏览器原生 PDF 插件通常自带这些功能，直接展示即可。

## 4. 验收标准

- 访问 `/upload/pdf2` 能够看到上传页面。
- 上传 PDF 文件后，预览区域使用浏览器原生插件展示 PDF。
- 文件信息显示正确，模拟上传逻辑正常执行。
