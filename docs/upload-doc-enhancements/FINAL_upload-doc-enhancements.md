# FINAL - upload-doc-enhancements

## 交付摘要

已完成 Word/PPT 深度预览能力与上传策略增强，Word 采用 docx-preview 渲染，PPT 采用 pptx-to-html 渲染，并加入大小限制、进度与重试能力。

## 代码交付清单

- 组件增强：
  - `src/pages/Upload/components/DocumentUploadPreview.tsx`
- 页面调整：
  - `src/pages/Upload/Word/index.tsx`
  - `src/pages/Upload/Ppt/index.tsx`
- 依赖新增：
  - `docx-preview`
  - `@jvmr/pptx-to-html`

## 风险与说明

- PPT 转 HTML 对复杂动画与高级特性支持有限
- Word 渲染效果受浏览器字体与样式影响
