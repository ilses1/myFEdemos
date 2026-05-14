# CONSENSUS - PDF2 预览任务共识

## 1. 明确的需求描述

- 在文件上传模块中新增 `PDF 预览 2` 功能。
- 核心区别：不使用 `@react-pdf-viewer`，而是使用浏览器自带的 PDF 预览功能。

## 2. 技术实现方案

- **类型定义**: 在 `src/services/uploadDocument.ts` 中将 `DocumentKind` 扩展包含 `pdf2`。
- **渲染逻辑**: 在 `src/pages/Upload/components/DocumentUploadPreview.tsx` 中，针对 `pdf2` 类型，使用 `<iframe>` 标签加载 `previewUrl`。
- **样式适配**: 原生 `<iframe>` 预览应具有与现有预览区域一致的尺寸（如高度 620px）。
- **集成方案**: 复用现有的 `DocumentUploadPreview` 通用组件，保持 UI 风格统一。

## 3. 任务边界与限制

- 仅处理 PDF 文件的原生预览。
- 不引入新的第三方 PDF 相关库。
- 预览效果依赖于用户浏览器的 PDF 插件支持情况（现代浏览器均内置支持）。

## 4. 验收标准

- [ ] 路由 `/upload/pdf2` 可访问。
- [ ] 上传 PDF 后，预览框内出现浏览器原生的 PDF 阅读器界面。
- [ ] 下载按钮功能正常。
- [ ] 模拟上传进度条和结果显示正常。
