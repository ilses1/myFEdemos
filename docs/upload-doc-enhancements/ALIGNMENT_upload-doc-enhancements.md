# ALIGNMENT - upload-doc-enhancements

## 原始需求

- Word 深度预览（docx 渲染）
- PPT 深度预览（pptx 渲染/转码）
- 上传策略增强（大小限制/进度/重试）

## 项目与任务特性分析

- Upload 模块已有通用上传预览组件 `DocumentUploadPreview`
- 现有预览为浏览器原生 iframe，Word/PPT 体验不足
- 技术栈：UmiJS Max + React18 + Ant Design + TypeScript

## 需求边界

### 范围内

- 引入前端可用的 Word docx 渲染库
- 引入前端可用的 pptx 解析/渲染库
- 在通用组件内实现：
  - 文件大小限制
  - 上传进度（模拟）
  - 失败重试

### 范围外

- 不实现真实后端转码服务
- 不实现复杂 Office 特性（动画、SmartArt、嵌入媒体等）

## 关键假设与决策

- Word 采用 `docx-preview` 在浏览器侧解析渲染 ArrayBuffer
- PPT 采用 `@jvmr/pptx-to-html` 将 pptx 转为 HTML 并展示
- 预览渲染失败时给出提示并保留下载入口
- 上传进度由前端模拟，保证交互可感知

## 验收标准（对齐版）

- Word 上传后在页面内完成 docx 内容渲染
- PPT 上传后渲染为 HTML 幻灯片列表可见
- 上传前校验文件大小，超限提示并阻止上传
- 上传中展示进度条，失败提供重试按钮
