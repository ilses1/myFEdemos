## 需求描述

- 使用第三方库实现 PDF 预览
- 维持现有上传与预览流程
- 提供可用的 PDF 阅读体验（缩放、分页、搜索由组件提供）

## 验收标准

- PDF 上传后可在预览区正常渲染
- 预览组件使用 @react-pdf-viewer/core
- iframe 预览被移除
- Word/PPT 预览不受影响

## 技术实现方案

- 引入依赖：@react-pdf-viewer/core、@react-pdf-viewer/default-layout、pdfjs-dist
- DocumentUploadPreview 中根据 kind === 'pdf' 渲染 Viewer
- 使用 Worker 组件配置 pdfjs workerUrl

## 边界与限制

- 不实现批注、签名等高级功能
- 不新增后端或存储改动
- 不引入测试框架
