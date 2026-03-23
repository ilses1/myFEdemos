## 实施总结

- 采用 @react-pdf-viewer/core + default-layout 替换 PDF 预览
- PDF 预览由第三方组件渲染，保留现有上传与预览流程
- 新增 pdfjs-dist 作为 worker 依赖

## 验证结果

- ESLint：通过
- Stylelint：通过

## 影响范围

- 仅影响 PDF 预览展示

## 已知限制

- 依赖 CDN workerUrl，可考虑后续自托管
