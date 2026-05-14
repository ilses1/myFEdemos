# CONSENSUS - PDF3 预览任务共识

## 1. 明确的需求描述

- 在 `/upload/pdf3` 路由下实现一个 PDF 预览器。
- 布局要求：左侧缩略图（高亮当前页），右侧主预览。
- 支持全屏切换。

## 2. 技术实现方案

- **依赖扩展**:
  - 确认安装 `@react-pdf-viewer/thumbnail` 插件（如果未安装则安装，或通过 core 实现简易版）。
- **组件结构**:
  - `src/pages/Upload/components/Pdf3Viewer.tsx`: 核心逻辑。
  - `src/pages/Upload/Pdf3/index.tsx`: 页面入口。
- **数据流**:
  - `DocumentUploadPreview` 提供 `fileBuffer` 或 `previewUrl`。
  - `Pdf3Viewer` 接收文件并渲染。

## 3. 任务边界与限制

- 仅处理 PDF 格式。
- 侧边栏宽度固定，不支持用户拖拽调整宽度。
- 全屏状态下通过 ESC 或关闭按钮退出。

## 4. 验收标准

- [ ] 访问 `/upload/pdf3` 成功。
- [ ] 上传 PDF 后，左侧显示缩略图，右侧显示第一页。
- [ ] 点击左侧缩略图，右侧自动跳转到对应页。
- [ ] 滚动右侧 PDF，左侧对应缩略图高亮更新。
- [ ] 点击全屏按钮，PDF 充满屏幕。
