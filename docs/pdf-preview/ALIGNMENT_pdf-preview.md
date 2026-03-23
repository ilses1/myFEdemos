## 项目上下文分析

- 技术栈：UmiJS Max v4、React 18、Ant Design 5、TypeScript、pnpm
- 现状：PDF 预览通过 iframe 直接加载本地 Object URL
- 相关模块：DocumentUploadPreview 负责上传与预览逻辑

## 原始需求

- PDF 预览使用第三方库实现
- 找出最适合的库并落地
- 按 6A 工作流输出

## 任务边界确认

- 仅替换 PDF 预览实现，不改动 Word/PPT/Excel 预览逻辑
- 不涉及后端接口改造
- 不新增测试框架

## 需求理解

- 使用成熟的 React PDF 预览库替代 iframe
- 保持现有上传与预览交互不变
- 尽量与现有 UI 风格一致

## 关键决策与假设

- 选型：使用 @react-pdf-viewer/core + default-layout
- Worker：使用 pdfjs-dist CDN 作为 workerUrl
- 依赖管理：在 package.json 中添加相关依赖

## 潜在风险

- CDN 不可用时 PDF 预览失败
- 大文件渲染性能与内存占用

## 疑问澄清

- 当前无额外交互需求（如批注、签名），默认使用基础工具栏
