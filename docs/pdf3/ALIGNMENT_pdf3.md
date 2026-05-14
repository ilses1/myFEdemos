# ALIGNMENT - PDF3 预览任务

## 1. 项目上下文分析

- **技术栈**: UmiJS Max (v4), React 18, Ant Design 5, TypeScript.
- **现有方案**:
  - `pdf`: 使用 `@react-pdf-viewer/core` + `default-layout`.
  - `pdf2`: 使用浏览器原生 `iframe`.
- **组件模式**: 复用 `DocumentUploadPreview.tsx` 处理文件上传与元数据展示。

## 2. 需求理解确认

- **核心需求**: 实现一个具有自定义侧边栏缩略图交互的 PDF 预览页面。
- **功能细节**:
  - **左侧栏**: 展示所有页面的缩略图，点击缩略图右侧主区域跳转，且当前页缩略图高亮。
  - **右侧主区域**: 展示选中的 PDF 页面内容。
  - **全屏功能**: 全屏时仅展示 PDF 内容。
- **路由**: 新增 `/upload/pdf3`。

## 3. 智能决策策略

- **库选型**:
  - 使用 `@react-pdf-viewer/core` 处理 PDF 核心渲染。
  - 引入 `@react-pdf-viewer/thumbnail` 插件实现缩略图功能。
- **集成方案**:
  - 在 `DocumentKind` 中增加 `pdf3`。
  - 新建 `Pdf3Viewer.tsx` 组件封装缩略图与主视图的联动逻辑。
  - 复用 `DocumentUploadPreview` 作为页面容器。

## 4. 疑问澄清

- **Q**: 是否需要支持缩略图大小调整？
- **A**: 初始实现采用固定宽度侧边栏（如 200px），缩略图自适应。
- **Q**: 全屏模式是浏览器全屏还是组件内全屏？
- **A**: 优先实现组件内全屏（覆盖页面区域），如需系统全屏可调用相关 API。
